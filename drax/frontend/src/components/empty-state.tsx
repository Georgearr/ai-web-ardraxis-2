export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-16 px-4 animate-fade-up">
      <div className="w-28 h-28 md:w-36 md:h-36 animate-float">
        <img
          src="/logo_ardraxis.png"
          alt="ARDRAXIS"
          className="w-full h-full object-contain"
          style={{
            filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))",
          }}
        />
      </div>
      <div>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-widest uppercase mb-4 gradient-text animate-glow"
        >
          DRAX
        </h1>
        <p
          className="text-base md:text-lg font-light tracking-wider leading-relaxed max-w-xl"
          style={{ color: "#b2dfdb" }}
        >
          Digital Resource Assistant of ARDRAXIS
        </p>
        <p
          className="text-sm md:text-base mt-2 italic"
          style={{ color: "#d6f3ef", opacity: 0.8 }}
        >
          Empowering Information, Igniting Innovation.
        </p>
      </div>
    </div>
  );
}
