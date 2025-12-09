"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function About() {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const texts = {
    tr: {
      title: "HAKKIMDA",
      description: `Sakarya Üniversitesi'nde son sınıf Bilişim Sistemleri Mühendisliği öğrencisiyim ve üç yıllık aktif Full-Stack Web Geliştirme deneyimine sahibim. Yazılım çözümleri geliştirme süreçlerine aktif olarak katkı sağladım ve şu anda DNS yönetimi ve dinamik alt alan adı (subdomain) otomasyonu üzerine odaklanan bir proje üzerinde çalışıyorum.`,
      skillsTitle: "Yetenekler",
      skills: [
        "React", "Next.js", "TypeScript", "Node.js", "Express.js", 
        "NestJS", "PostgreSQL", "MongoDB", "Docker", "Git",
        "Tailwind CSS", "REST API", "GraphQL", "JWT", "Prisma"
      ],
      stats: [
        { number: "3+", label: "Yıllık Deneyim" },
        { number: "5+", label: "Tamamlanan Proje" },
        { number: "%90+", label: "Pozitif Geri Bildirim" },
      ],
    },
    en: {
      title: "ABOUT ME",
      description: `I am a senior student at Sakarya University, studying Information Systems Engineering with three years of active Full-Stack Web Development experience. I have actively contributed to software solution development processes and currently work on a project focused on DNS management and dynamic subdomain automation.`,
      skillsTitle: "Skills",
      skills: [
        "React", "Next.js", "TypeScript", "Node.js", "Express.js", 
        "NestJS", "PostgreSQL", "MongoDB", "Docker", "Git",
        "Tailwind CSS", "REST API", "GraphQL", "JWT", "Prisma"
      ],
      stats: [
        { number: "3+", label: "Years of Experience" },
        { number: "5+", label: "Completed Projects" },
        { number: "90%+", label: "Positive Feedback" },
      ],
    },
  };

  const { title, description, skillsTitle, skills, stats } = language === "tr" ? texts.tr : texts.en;

  return (
    <section className={`${styles.container} ${theme === "dark" ? styles.darkTheme : ""}`} id="about">
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <Image
              src={"/me1.jpg"}
              alt={title}
              width={300}
              height={300}
              className={styles.image}
            />
          </div>
        </div>
        
        <div className={styles.textContent}>
          <p className={styles.description}>{description}</p>

          <div className={styles.skillsSection}>
            <h3 className={styles.skillsTitle}>{skillsTitle}</h3>
            <div className={styles.skillsGrid}>
              {skills.map((skill, idx) => (
                <span key={idx} className={styles.skillBadge}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.stats}>
            {stats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
