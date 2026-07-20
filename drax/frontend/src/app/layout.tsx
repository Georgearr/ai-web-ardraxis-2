import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRAX | Digital Resource Assistant of ARDRAXIS",
  description:
    "AI-powered assistant that helps you obtain official information about ARDRAXIS, OSIS SMA Ignatius Global School.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="/logo_ardraxis.png"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
