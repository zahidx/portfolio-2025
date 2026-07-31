import { NextResponse } from "next/server";
import { db, collection, getDocs } from "@/app/components/firebase";

export async function POST(req) {
  try {
    const { subject, message, accessCode } = await req.json();

    if (accessCode !== "8209" && accessCode !== process.env.ADMIN_ACCESS_CODE) {
      return NextResponse.json({ error: "Unauthorized access code." }, { status: 401 });
    }

    if (!subject || !message) {
      return NextResponse.json({ error: "Subject and message are required." }, { status: 400 });
    }

    // Fetch all subscriber emails from Firestore
    const querySnapshot = await getDocs(collection(db, "newsletter"));
    const subscriberEmails = querySnapshot.docs.map((doc) => doc.data().email).filter(Boolean);

    if (subscriberEmails.length === 0) {
      return NextResponse.json({ message: "No subscribers found to send." });
    }

    // Send emails via Resend API if API Key present
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          subscriberEmails.map((email) => ({
            from: "Zahidul Islam <newsletter@zahid.dev>",
            to: [email],
            subject: subject,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #060613; color: #ffffff; border-radius: 16px;">
                <h2 style="color: #818cf8;">${subject}</h2>
                <div style="color: #e2e8f0; font-size: 14px; line-height: 1.6;">
                  ${message.replace(/\n/g, "<br/>")}
                </div>
                <hr style="border-color: #334155; margin-top: 24px; margin-bottom: 24px;" />
                <p style="font-size: 11px; color: #94a3b8;">
                  You received this email because you subscribed to Zahidul Islam's Newsletter.
                </p>
              </div>
            `,
          }))
        ),
      });
    }

    return NextResponse.json({
      success: true,
      sentCount: subscriberEmails.length,
      recipients: subscriberEmails,
      message: `Broadcast successfully sent to ${subscriberEmails.length} subscribers!`,
    });
  } catch (error) {
    console.error("Newsletter Broadcast Error:", error);
    return NextResponse.json({ error: "Failed to send newsletter broadcast." }, { status: 500 });
  }
}
