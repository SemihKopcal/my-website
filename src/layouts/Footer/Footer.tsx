"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // 🌐 Dil destekli metin
  const createdText = language === "tr" ? "Oluşturan" : "Created by";

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* e‑mail */}
        <a href="mailto:semihkopcal1@gmail.com" className={styles.email}>
          semihkopcal1@gmail.com
        </a>

        {/* sosyal ikonlar */}
        <div className={styles.icons}>
          <a
            href="https://github.com/semihkopcal"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/icons/github.svg"}
              alt="Github"
              width={50}
              height={50}
            />
          </a>
          <a
            href="https://linkedin.com/in/semihkopcal"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/icons/linkedin.svg"}
              alt="LinkedIn"
              width={50}
              height={50}
            />
          </a>
          <a href="mailto:semihkopcal1@gmail.com" aria-label="E-mail">
            <Image
              src={"/icons/email.svg"}
              alt="E-mail"
              width={50}
              height={50}
            />
          </a>
        </div>

        <p className={styles.credit}>
          © {new Date().getFullYear()} • {createdText}
          &nbsp;&nbsp;Semih&nbsp;Kopcal
        </p>
      </div>

      {/* back‑to‑top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className={styles.topBtn}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
}
