"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatMessage } from "@/components/chat-message";
import { TypingIndicator } from "@/components/typing-indicator";
import { ChatInput } from "@/components/chat-input";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { SuggestionChips } from "@/components/suggestion-chips";
import { sendMessage, type ChatResponse } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function DraxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSend = async (message: string) => {
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    try {
      const data: ChatResponse = await sendMessage(message);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Gagal terhubung ke server";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      }}
    >
      <Header />

      <main className="flex-1 flex flex-col pt-20 pb-4">
        <div className="flex-1 max-w-4xl w-full mx-auto px-4 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 py-6 px-2">
            {messages.length === 0 && !error && (
              <>
                <EmptyState />
                <div className="mt-8">
                  <SuggestionChips onSelect={handleSend} />
                </div>
              </>
            )}

            {messages.map((msg, idx) => (
              <ChatMessage key={idx} role={msg.role} content={msg.content} />
            ))}

            {isLoading && <TypingIndicator />}

            {error && (
              <ErrorState
                message={error}
                onRetry={() => {
                  setError(null);
                  const lastUserMsg = [...messages]
                    .reverse()
                    .find((m) => m.role === "user");
                  if (lastUserMsg) handleSend(lastUserMsg.content);
                }}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="pb-4 pt-2">
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
