"use client";

import {
    Bot,
    Briefcase,
    Check,
    Code2,
    Copy,
    FileText,
    RefreshCw,
    Send,
    Sparkles,
    User,
    X,
    Zap
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SUGGESTED_QUESTIONS = [
  { text: "What is Zahid's tech stack?", icon: Code2 },
  { text: "Can Zahid build AI web apps?", icon: Zap },
  { text: "Tell me about his research paper", icon: FileText },
  { text: "Is Zahid available for hire?", icon: Briefcase },
];

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "👋 Hi there! I'm **Ask Zahid AI**, Zahidul's personal AI assistant.\n\nAsk me anything about Zahid's software engineering background, tech stack, projects, research, or availability!"
};

export default function AIChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg = { role: "user", content: query.trim() };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        // Non-JSON body (e.g. plain-text 500) — fall back to friendly message below.
      }
      const replyText = data.message || data.error || "Sorry, I couldn't process that. Feel free to contact Zahid directly at zahid.imx@gmail.com!";

      setMessages((prev) => [...prev, { role: "assistant", content: replyText }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops, I encountered a network error. You can reach out directly to Zahid at **zahid.imx@gmail.com**!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Simple Markdown Renderer Helper
  const renderFormattedContent = (content) => {
    // Replace **bold** text
    const parts = content.split(/(\*\*.*?\*\*|\n)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-bold text-indigo-400 dark:text-indigo-300">{part.slice(2, -2)}</strong>;
      }
      if (part === "\n") {
        return <br key={i} />;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-lg backdrop-blur-md text-xs font-mono font-bold group transition-all active:scale-95 hover:scale-105"
          style={{
            background: "rgba(9,8,26,0.92)",
            borderColor: "#c084fc88",
            color: "#c084fc",
            boxShadow: "0 0 20px rgba(192, 132, 252, 0.2)"
          }}
          title="Zahid AI Assistant"
          aria-label="Open Zahid AI Chat"
        >
          <Bot className="w-4 h-4 text-purple-400 group-hover:animate-pulse" />
          <span>Zahid AI</span>
          <span className="flex items-center justify-center ml-1 p-1 rounded-full opacity-80 border border-purple-500/40 bg-purple-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </span>
        </button>
      )}

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-800 shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800/80 bg-slate-950/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-md shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">Zahid AI</h3>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                    Assistant
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online & Ready</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 min-h-0 p-4 space-y-4 overflow-y-auto custom-scrollbar">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-indigo-400 border border-slate-700"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </div>

                {/* Bubble */}
                <div className="group relative max-w-[85%]">
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20"
                        : "bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none"
                    }`}
                  >
                    {renderFormattedContent(msg.content)}
                  </div>

                  {/* Copy button for assistant responses */}
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleCopy(msg.content, idx)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 left-1 text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Loading / Typing Bouncing Dots */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-indigo-400 border border-slate-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 rounded-tl-none flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions (Shown when only initial message exists or at bottom) */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/40 shrink-0">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>Suggested Questions</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q, idx) => {
                  const Icon = q.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSend(q.text)}
                      disabled={isLoading}
                      className="px-2.5 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 hover:border-indigo-500/40 text-indigo-300 text-xs font-medium flex items-center gap-1.5 transition-all text-left"
                    >
                      <Icon className="w-3 h-3 text-indigo-400 shrink-0" />
                      <span>{q.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/90 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Zahid's skills, projects..."
                disabled={isLoading}
                className="flex-1 bg-slate-900 text-white placeholder-slate-500 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-600/20 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 text-center text-[10px] text-slate-500">
              Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[9px]">Enter</kbd> to send
            </div>
          </div>

        </div>
      )}
    </>
  );
}
