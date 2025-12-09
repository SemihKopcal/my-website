"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import AnimatedBackground from "@/components/AnimatedBackground";

function Main() {
  const { language } = useLanguage();
  const { theme } = useTheme();

  // Dil bazlı metinler
  const texts = {
    title: language === "tr" ? "Semih Kopcal" : "Semih Kopcal",
    subtitle: language === "tr" ? "Full-Stack Web Geliştirici ve Yaratıcı Problem Çözücü" : "Full-Stack Web Developer & Creative Problem Solver",
    downloadCV: language === "tr" ? "CV'mi İndir" : "Download My CV",
    contactMe: language === "tr" ? "İletişime Geç" : "Contact Me",
  };

  return (
    <div className={styles.mainC} id="home" data-theme={theme}>
      <AnimatedBackground />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.mainContent}>
            <div className={styles.imageWrapper}>
              <Image
                src="/me.jpg"
                alt="Profile Picture"
                width={200}
                height={200}
                className={styles.profileImage}
                priority
              />
            </div>
            <h1 className={styles.title}>{texts.title}</h1>
            <p className={styles.subtitle}>{texts.subtitle}</p>

            <div className={styles.buttons}>
              <a href="/cv/SemihKopcal.pdf" download className={styles.primaryButton}>
                {texts.downloadCV}
              </a>

              <a className={styles.secondaryButton} href="#contact">
                {texts.contactMe}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
