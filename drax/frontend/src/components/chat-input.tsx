"use client";

import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tanyakan sesuatu tentang ARDRAXIS..."
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-2xl px-5 py-3.5 text-base outline-none transition-all duration-200 placeholder:text-white/40"
          style={{
            background: "rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#e8f7f7",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
          }}
        />
      </div>
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className={cn(
          "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        )}
        style={{
          background: input.trim()
            ? "linear-gradient(135deg, #1d696e 0%, #2d8f9a 100%)"
            : "rgba(255, 255, 255, 0.1)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          color: "white",
        }}
        onMouseEnter={(e) => {
          if (input.trim()) {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.3)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  );
}
