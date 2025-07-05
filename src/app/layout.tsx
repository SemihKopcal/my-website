import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Semih Kopcal | Full Stack Web Developer",
  description:
    "Semih Kopcal'ın kişisel portföy sitesi. Web geliştirme, projeler, blog yazıları ve iletişim bilgileri.",
  keywords: [
    "Semih Kopcal",
    "web developer",
    "yazılım geliştirici",
    "frontend",
    "backend",
    "portföy",
    "react",
    "next.js",
  ],
  authors: [{ name: "Semih Kopcal", url: "https://semihkopcal.com" }],
  creator: "Semih Kopcal",
  openGraph: {
    title: "Semih Kopcal | Full Stack Web Developer",
    description:
      "Semih Kopcal'ın kişisel portföy sitesini ziyaret edin. Web geliştirme projeleri ve daha fazlası.",
    url: "https://semihkopcal.com",
    siteName: "Semih Kopcal",
    images: [
      {
        url: "https://semihkopcal.com/images/og-image.png", // og:image
        width: 1200,
        height: 630,
        alt: "Semih Kopcal kişisel web sitesi",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Semih Kopcal | Full Stack Web Developer",
    description: "Semih Kopcal'ın kişisel web sitesi.",
    creator: "@semihkopcal",
    images: ["https://semihkopcal.com/images/og-image.png"],
  },
  metadataBase: new URL("https://semihkopcal.com"), // canonical URL için
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" style={{ margin: "0", padding: "0" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
