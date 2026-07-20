export function Footer() {
  const SOCIAL_LINKS = [
    { href: "https://www.instagram.com/osis.smaigs/", icon: "ig", label: "Instagram" },
    { href: "https://x.com/osis_smaigs", icon: "x", label: "Twitter" },
    { href: "https://www.tiktok.com/@osis.smaigs", icon: "tt", label: "Tiktok" },
    { href: "https://line.me/R/ti/p/@053dzdrl", icon: "line", label: "Line" },
    { href: "https://www.youtube.com/channel/UCJcG1VCjXHNig5JIDEgYH7w", icon: "yt", label: "Youtube" },
    { href: "https://github.com/OSISSMAIGS", icon: "gh", label: "Github" },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #3A7070 0%, #315f5f 55%, #2a5151 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <img
                src="/logo_ardraxis.png"
                alt="ARDRAXIS"
                className="w-16 h-16 object-contain"
                style={{ filter: "drop-shadow(0 8px 18px rgba(0, 0, 0, .35))" }}
              />
              <h3
                className="text-xl font-black tracking-wide uppercase"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #e1f3f3 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ARDRAXIS
              </h3>
            </div>
            <p className="text-sm" style={{ color: "#e8f7f7", opacity: 0.92 }}>
              Kabinet OSIS SMA Ignatius Global School
              <br />
              periode 2025/2026
            </p>
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.14)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                  e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,.28)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span className="text-white text-2xl">
                  {social.icon === "ig" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  )}
                  {social.icon === "x" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  )}
                  {social.icon === "tt" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                  )}
                  {social.icon === "line" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  )}
                  {social.icon === "yt" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                  )}
                  {social.icon === "gh" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  )}
                </span>
                <span className="text-xs" style={{ color: "#e8f7f7" }}>
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
