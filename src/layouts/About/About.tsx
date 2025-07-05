"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { language } = useLanguage();

  const texts = {
    tr: {
      title: "HAKKIMDA",
      description: `Sakarya Üniversitesi'nde son sınıf Bilişim Sistemleri Mühendisliği öğrencisiyim ve üç yıllık aktif Full-Stack Web Geliştirme deneyimine sahibim. Yazılım çözümleri geliştirme süreçlerine aktif olarak katkı sağladım ve şu anda DNS yönetimi ve dinamik alt alan adı (subdomain) otomasyonu üzerine odaklanan bir proje üzerinde çalışıyorum. Ayrıca, Oyun Tasarımı ve Geliştirme Topluluğu'nun yönetim kurulunda görev aldım; etkinlikler düzenledim ve teknik konuşmalar ile sunumlara katıldım.`,
      stats: [
        { number: "3+", label: "Yıllık Deneyim" },
        { number: "5+", label: "Tamamlanan Proje" },
        { number: "%90+", label: "Pozitif Geri Bildirim" },
      ],
    },
    en: {
      title: "ABOUT ME",
      description: `I am a senior student at Sakarya University, studying Information Systems Engineering with three years of active Full-Stack Web Development experience. I have actively contributed to software solution development processes and currently work on a project focused on DNS management and dynamic subdomain automation. Additionally, I served on the board of the Game Design and Development Club; organizing events and participating in technical talks and presentations.`,
      stats: [
        { number: "3+", label: "Years of Experience" },
        { number: "5+", label: "Completed Projects" },
        { number: "90%+", label: "Positive Feedback" },
      ],
    },
  };

  const { title, description, stats } = language === "tr" ? texts.tr : texts.en;

  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src={"/me1.jpg"}
            alt={title}
            width={225}
            height={300}
            className={styles.image}
          />
        </div>
        <div className={styles.textContent}>
          <p>{description}</p>

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
