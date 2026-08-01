"use client";
import { formatDistanceToNow } from "date-fns"; // Import date-fns for time formatting
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner"; // Import the loader
import { collection, db, getDocs } from "../components/firebase"; // Import Firestore methods

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [emails, setEmails] = useState([]); // State to store emails from Firestore (newsletter collection)
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); // Password validation state
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal visibility state
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false); // Incorrect password state for animation

  // Fetch messages from Firestore
  const fetchMessages = async () => {
    setIsLoading(true); // Start loading
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const messagesData = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messagesData); // Set messages from Firestore
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Fetch emails from Firestore (newsletter subscribers)
  const fetchEmails = async () => {
    setIsLoading(true); // Start loading for emails
    try {
      const querySnapshot = await getDocs(collection(db, "newsletter")); // Use the 'newsletter' collection
      const emailsData = querySnapshot.docs.map((doc) => ({
        email: doc.data().email,
        timestamp: doc.data().timestamp.seconds, // Assuming timestamp is stored as Firestore timestamp
      }));
      setEmails(emailsData); // Set emails from Firestore
    } catch (error) {
      console.error("Error fetching emails:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Handle password input
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "8209") {
      setIsPasswordCorrect(true); // If password is correct
      setIsModalOpen(false); // Close the modal
      fetchMessages(); // Fetch messages after correct password
      fetchEmails(); // Fetch emails after correct password
    } else {
      setIsPasswordIncorrect(true); // Set incorrect password state
      setTimeout(() => setIsPasswordIncorrect(false), 500); // Reset after animation
    }
  };

  // Fetch emails every 10 seconds to simulate "refetching"
  useEffect(() => {
    const interval = setInterval(() => {
      fetchEmails();
    }, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-purple-900 to-indigo-900 text-white min-h-screen">
      {/* Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 transition-opacity duration-300 ease-in-out">
          <div
            className={`bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-transform duration-300 ease-in-out ${
              isPasswordIncorrect ? "shake-animation" : ""
            }`}
          >
            <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
              Enter Access Code
            </h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                required
              />
              <button
                type="submit"
                className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Messages Page */}
      {!isModalOpen && (
        <div className="py-20 px-8 md:px-36 relative">
          <h1 className="text-6xl font-extrabold text-center text-indigo-400 mb-12">Messages</h1>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <Oval color="#4c51bf" height={80} width={80} /> {/* React Loader Spinner */}
            </div>
          ) : (
            <div className="space-y-8">
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-gray-100">{message.name}</h3>
                    <p className="text-gray-300">Email: {message.email}</p>
                    <p className="text-gray-300">Subject: {message.subject}</p>
                    <p className="text-gray-300">Message: {message.message}</p>
                    <p className="text-xs text-gray-400">
                      Received on: {new Date(message.timestamp.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center text-lg text-gray-400">No messages found</div>
              )}
            </div>
          )}

          {/* Newsletter Subscription Section - Emails from Firestore */}
          <div className="mt-20 max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-center text-indigo-400 mb-2">
              Newsletter Subscribers ({emails.length})
            </h2>
            <p className="text-xs text-center text-gray-400 mb-6">
              Live email updates and subscriber list from Firestore
            </p>

            {/* Newsletter Broadcast Sender Form */}
            <div className="mb-8 p-6 rounded-xl bg-gray-900 border border-indigo-500/30">
              <h3 className="text-xl font-bold text-indigo-300 mb-2">
                📢 Broadcast Email Update to All Subscribers
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Compose and send a newsletter email update directly to all {emails.length} subscriber inbox addresses.
              </p>
              
              <BroadcastForm password={password} emailsCount={emails.length} />
            </div>

            <div className="space-y-3">
              {emails.length > 0 ? (
                emails.map((emailData, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between">
                    <p className="text-gray-200 font-mono text-sm">{emailData.email}</p>
                    <p className="text-xs text-gray-400 font-mono">
                      Subscribed {formatDistanceToNow(new Date(emailData.timestamp * 1000), { addSuffix: true })}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No subscribers yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BroadcastForm({ password, emailsCount }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    if (!subject || !message) return;
    setSending(true);
    setStatusMsg("");
    try {
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          message,
          accessCode: password || "8209",
        }),
      });
      let data = {};
      try {
        data = await res.json();
      } catch {
        // Non-JSON error body — fall back to generic message below.
      }
      if (res.ok) {
        setStatusMsg(`✅ ${data.message || `Successfully broadcast to ${emailsCount} subscribers!`}`);
        setSubject("");
        setMessage("");
      } else {
        setStatusMsg(`❌ ${data.error || "Failed to send broadcast."}`);
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("❌ Network error. Failed to dispatch broadcast.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSendBroadcast} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1">Email Subject Line</label>
        <input
          type="text"
          placeholder="e.g. New Article: Building Scalable Web Apps"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1">Newsletter Message Content</label>
        <textarea
          rows={4}
          placeholder="Write your email announcement or article summary here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
          required
        />
      </div>

      {statusMsg && (
        <div className="p-3 rounded-lg text-xs font-mono bg-gray-800 border border-indigo-500/40">
          {statusMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all shadow-md shadow-indigo-600/30"
      >
        {sending ? "Dispatching Email Broadcast..." : `Send Email Broadcast (${emailsCount} Recipients)`}
      </button>
    </form>
  );
}
