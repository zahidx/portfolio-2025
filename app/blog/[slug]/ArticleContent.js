"use client";

import { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";

/* ── Code Block with Copy Button Component ── */
function CodeBlock({ code, language = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-2xl border border-white/15 bg-[#09091b] overflow-hidden font-mono text-xs shadow-xl">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/10 text-slate-400">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[11px] font-bold uppercase">{language || "code"}</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 transition-colors text-[10px]"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre className="p-4 sm:p-5 overflow-x-auto text-slate-200 leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ── Custom Lightweight Markdown Parser & Renderer ── */
export default function ArticleContent({ content = "" }) {
  const lines = content.split("\n");
  const elements = [];
  let codeBuffer = [];
  let inCodeBlock = false;
  let codeLang = "";

  lines.forEach((line, idx) => {
    // Check code blocks ```
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // End of code block
        elements.push(
          <CodeBlock
            key={`code-${idx}`}
            code={codeBuffer.join("\n")}
            language={codeLang}
          />
        );
        codeBuffer = [];
        inCodeBlock = false;
        codeLang = "";
      } else {
        // Start of code block
        inCodeBlock = true;
        codeLang = line.trim().replace("```", "").trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // Headings
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={idx} className="text-3xl font-extrabold text-white mt-10 mb-4 tracking-tight">
          {line.replace("# ", "")}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={idx} className="text-2xl font-bold text-indigo-300 mt-8 mb-4 border-b border-white/10 pb-2">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("> ")) {
      // Blockquotes
      elements.push(
        <blockquote
          key={idx}
          className="my-4 pl-4 border-l-4 border-indigo-400 italic text-slate-300 bg-white/[0.02] py-2 rounded-r-lg"
        >
          {line.replace("> ", "")}
        </blockquote>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      // Bullet items
      elements.push(
        <li key={idx} className="ml-6 list-disc text-slate-300 my-1 text-sm leading-relaxed">
          {line.replace(/^[-*]\s+/, "")}
        </li>
      );
    } else if (line.trim() === "---") {
      // Divider
      elements.push(<hr key={idx} className="my-8 border-white/10" />);
    } else if (line.trim() !== "") {
      // Paragraph
      elements.push(
        <p key={idx} className="text-slate-300 text-sm sm:text-base leading-relaxed my-4 font-normal">
          {line}
        </p>
      );
    }
  });

  return <div className="article-body font-sans text-slate-200">{elements}</div>;
}
