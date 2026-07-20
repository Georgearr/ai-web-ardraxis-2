"use client";

interface SuggestionChipsProps {
  onSelect: (question: string) => void;
}

const QUICK_QUESTIONS = [
  "Apa itu ARDRAXIS?",
  "Siapa ketua OSIS saat ini?",
  "Apa saja event yang akan datang?",
  "Siapa saja anggota OSIS?",
  "Apa program kerja Multimedia?",
  "Bagaimana cara menghubungi OSIS?",
];

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {QUICK_QUESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
          style={{
            background: "rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#e8f7f7",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.25)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {q}
        </button>
      ))}
    </div>
  );
}
