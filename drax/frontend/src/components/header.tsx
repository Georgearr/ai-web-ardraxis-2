"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "https://osissmaigs.com", label: "HOME" },
  { href: "https://osissmaigs.com/home#events", label: "EVENTS" },
  { href: "https://osissmaigs.com/about_us", label: "ABOUT US" },
  { href: "/drax", label: "D'RAX" },
];

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgb(29, 105, 110)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 3px 25px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <a
            href="https://osissmaigs.com"
            className="flex items-center gap-3 no-underline"
          >
            <img
              src="/logo_ardraxis.png"
              alt="ARDRAXIS"
              className="h-10 w-auto rounded-lg object-cover"
            />
            <span
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide"
              style={{
                textShadow:
                  "0 0 5px #0e3a42, 0 0 1px #0e3a42, 0 0 1.5px #0e3a42, 0 0 2px white",
              }}
            >
              ARDRAXIS
            </span>
          </a>

          <nav className="hidden lg:flex gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white no-underline text-lg font-extrabold tracking-wide px-2.5 py-2 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                style={
                  link.href === "/drax"
                    ? {
                        textShadow:
                          "0 0 10px #96cccd, 0 0 20px #96cccd, 0 0 40px #96cccd",
                      }
                    : {}
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="lg:hidden flex flex-col justify-around w-[30px] h-[30px] bg-transparent border-none cursor-pointer relative z-[1001]"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "w-full h-[3px] bg-white rounded-sm transition-all duration-300 origin-center",
                sidebarOpen && "translate-y-[10px] rotate-45"
              )}
            />
            <span
              className={cn(
                "w-full h-[3px] bg-white rounded-sm transition-all duration-300",
                sidebarOpen && "opacity-0 translate-x-[-20px]"
              )}
            />
            <span
              className={cn(
                "w-full h-[3px] bg-white rounded-sm transition-all duration-300 origin-center",
                sidebarOpen && "translate-y-[-10px] -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[999] transition-opacity duration-300",
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={cn(
          "fixed top-0 right-0 w-[300px] h-full z-[1000] transition-all duration-300 overflow-y-auto shadow-2xl",
          sidebarOpen ? "right-0" : "-right-[300px]"
        )}
        style={{
          background: "linear-gradient(to bottom, rgb(29, 105, 110), rgb(48, 171, 180))",
        }}
      >
        <div
          className="flex items-center gap-3 p-5 border-b border-white/10"
          style={{ background: "rgba(29, 105, 110, 0.9)" }}
        >
          <img
            src="/logo_ardraxis.png"
            alt="ARDRAXIS"
            className="h-10 w-auto rounded-lg object-cover"
          />
          <span
            className="flex-1 text-2xl font-black text-white tracking-wide"
            style={{
              textShadow:
                "0 0 5px #0e3a42, 0 0 1px #0e3a42, 0 0 1.5px #0e3a42, 0 0 2px white",
            }}
          >
            ARDRAXIS
          </span>
          <button
            className="bg-transparent border-none text-white text-3xl cursor-pointer w-[35px] h-[35px] flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10 hover:rotate-90"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <nav className="flex flex-col py-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white no-underline text-lg font-extrabold tracking-wide py-[15px] px-[25px] transition-all duration-300 border-l-[3px] border-transparent hover:bg-white/10 hover:border-l-white hover:pl-[30px]"
              style={
                link.href === "/drax"
                  ? {
                      textShadow: "0 0 5px #96cccd, 0 0 10px #96cccd",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderLeftColor: "white",
                    }
                  : {}
              }
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
