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
    "Semih Kopcal'ın minimalist portföyü. Modern web çözümleri, Full-Stack geliştirme ve yaratıcı mühendislik projeleri.",
  keywords: [
    "Semih Kopcal",
    "Full Stack Developer",
    "Minimalist Web Design",
    "Next.js Developer",
    "React Engineer",
    "Portfolio",
    "Software Engineering"
  ],
  authors: [{ name: "Semih Kopcal", url: "https://semihkopcal.com" }],
  creator: "Semih Kopcal",
  metadataBase: new URL("https://semihkopcal.com"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/tr",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Semih Kopcal | Full Stack Web Developer",
    description:
      "Modern ve performanslı web çözümleri sunan Semih Kopcal'ın kişisel portföyünü keşfedin.",
    url: "https://semihkopcal.com",
    siteName: "Semih Kopcal",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Semih Kopcal Portfolio",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Semih Kopcal | Minimalist Portfolio",
    description: "Full Stack Web Developer & Software Engineer.",
    creator: "@semihkopcal",
    images: ["/images/og-image.png"],
  },
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" style={{ margin: "0", padding: "0", minWidth: "100%" }}>
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
