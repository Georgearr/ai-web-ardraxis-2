export function TypingIndicator() {
  return (
    <div className="flex w-full gap-3 justify-start animate-fade-up">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
        style={{
          background: "linear-gradient(135deg, #1d696e 0%, #2d8f9a 100%)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          color: "white",
        }}
      >
        D
      </div>
      <div
        className="rounded-2xl rounded-tl-md px-5 py-4"
        style={{
          background: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <div className="flex gap-1.5 items-center">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
}
