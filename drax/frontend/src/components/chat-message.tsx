"use client";

import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-3 animate-fade-up",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      {role === "assistant" && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            background: "linear-gradient(135deg, #1d696e 0%, #2d8f9a 100%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            color: "white",
          }}
        >
          D
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3 text-base leading-relaxed",
          role === "user"
            ? "rounded-tr-md"
            : "rounded-tl-md"
        )}
        style={
          role === "user"
            ? {
                background: "linear-gradient(135deg, #1d696e 0%, #2d8f9a 100%)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }
            : {
                background: "rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#e8f7f7",
              }
        }
      >
        {role === "assistant" ? (
          <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-headings:text-white">
            <Markdown
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-drax-300 underline hover:text-drax-200"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="bg-black/30 rounded px-1.5 py-0.5 text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto border border-white/10">
                    {children}
                  </pre>
                ),
              }}
            >
              {content}
            </Markdown>
          </div>
        ) : (
          <p>{content}</p>
        )}
      </div>
      {role === "user" && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            color: "#b2dfdb",
          }}
        >
          U
        </div>
      )}
    </div>
  );
}
