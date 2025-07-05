"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

function Main() {
  const { language } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Dil bazlı metinler
  const texts = {
    title: language === "tr" ? "Semih Kopcal Portföy" : "Semih Kopcal Portfolio",
    subtitle: language === "tr" ? "Full-Stack Web Geliştirici" : "Full-Stack Web Developer",
    downloadCV: language === "tr" ? "CV'mi İndir" : "Download My CV",
    contactMe: language === "tr" ? "İletişime Geç" : "Contact Me",
  };

  return (
    <div className={styles.mainC} id="home" data-theme={theme}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.mainContent}>
            <Image
              src="/me.jpg"
              alt="Profile Picture"
              width={250}
              height={250}
              className={styles.profileImage}
              priority
            />
            <h1 className={styles.title}>{texts.title}</h1>
            <p className={styles.description}>{texts.subtitle}</p>

            <div className={styles.buttons}>
              <a href="/cv/Semih Kopcal.pdf" download className={styles.cvButton}>
                {texts.downloadCV}
              </a>

              <a className={styles.cwe} href="mailto:semihkopcal1@gmail.com">
                {texts.contactMe}{" "}
                <Image
                  className={styles.icon}
                  src={"/icons/email.svg"}
                  alt="email"
                  width={25}
                  height={25}
                  priority
                />
              </a>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
