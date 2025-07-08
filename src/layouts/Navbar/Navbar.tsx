"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Menüye referans
  const { language, setLanguage } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = {
    tr: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Teknolojiler", href: "#tech" },
      { label: "Hakkımda", href: "#about" },
      { label: "Projeler", href: "#projects" },
      { label: "İletişim", href: "#contact" },
    ],
    en: [
      { label: "Home", href: "/" },
      { label: "Technologies", href: "#tech" },
      { label: "About Me", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  };

  const currentItems = language === "tr" ? navItems.tr : navItems.en;

  // 🔒 Sayfa dışına tıklanınca menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerUpper}>
        <div className={styles.container}>
          <div className={styles.row}>
            {/* Logo */}
            <div className={styles.logoCol}>
              <Link href="/" className={styles.logoArea} onClick={closeMenu}>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={150}
                  height={100}
                  priority
                />
              </Link>
            </div>

            {/* Menü */}
            <div className={styles.menuCol} ref={menuRef}>
              <nav
                className={`${styles.mainMenu} ${
                  isMenuOpen ? styles.menuOpen : ""
                }`}
              >
                <ul className={styles.onepage}>
                  {currentItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={styles.linkStyle}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}

                  {/* Butonlar */}
                  <li className={styles.utilityButtons}>
                    <button
                      onClick={() =>
                        setLanguage(language === "tr" ? "en" : "tr")
                      }
                      className={styles.langBtn}
                    >
                      {language === "tr" ? "EN" : "TR"}
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Mobil Menü Butonu */}
              <button
                aria-label="Menüyü Aç"
                className={styles.sideMenuBtn}
                onClick={toggleMenu}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
