import { NextResponse } from "next/server";
import { db, collection, addDoc } from "@/app/components/firebase";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Save subscriber to Firestore
    const docRef = await addDoc(collection(db, "newsletter"), {
      email,
      timestamp: new Date(),
    });

    // Send Welcome Email confirmation via Resend / Email Webhook if key configured, or log confirmation
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Zahidul Islam <newsletter@zahid.dev>",
          to: [email],
          subject: "Welcome to Zahid's Tech Newsletter! 🚀",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
              <h2 style="color: #6366f1;">Thanks for subscribing! 🎉</h2>
              <p>Hi there,</p>
              <p>Thank you for subscribing to my technical newsletter. You'll receive updates whenever I publish new articles on full-stack web development, AI research, and architecture guides.</p>
              <br/>
              <p>Best regards,<br/><strong>Zahidul Islam</strong><br/>Software Engineer & Researcher</p>
            </div>
          `,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed and welcome email dispatched!",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    return NextResponse.json({ error: "Failed to process subscription." }, { status: 500 });
  }
}
