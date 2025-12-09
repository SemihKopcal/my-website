"use client";
import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const projectsData = {
  tr: [
    {
      id: 1,
      title: "Menu Leaf – Dijital Menü Yönetim Sistemi",
      shortDescription: "Restoran ve kafeler için modern dijital menü oluşturma platformu",
      tech: ["Next.js", "TypeScript", "Nest.js", "PostgreSQL", "Docker", "JWT"],
      images: ["/images/nokta-kafe.jpg", "/images/doya-doya.jpg", "/images/menu-leaf.jpg"],
      demoUrl: "https://menu-leaf.com/tr",
      codeUrl: "",
    },
    {
      id: 2,
      title: "Bilir Nakliyat – Profesyonel Nakliye Platformu",
      shortDescription: "Sigortalı ve güvenli nakliye hizmetleri için modern web platformu",
      tech: ["Next.js", "React", "Node.js", "Express", "MongoDB"],
      images: ["/images/bilir-nakliyat1.jpg", "/images/bilir-nakliyat2.jpg"],
      demoUrl: "https://bilirnakliyat.net",
      codeUrl: "",
    },
    {
      id: 3,
      title: "Tabu Epic – Kelime Oyunu",
      shortDescription: "Takım bazlı eğlenceli kelime tahmin oyunu mobil uygulaması",
      tech: ["React Native", "Express.js", "MongoDB", "AdMob"],
      images: ["/images/tabu-epic.png", "/images/tabu.jpg"],
      demoUrl: "",
      codeUrl: "",
    },
    {
      id: 4,
      title: "Diyetisyen Web Sistemi",
      shortDescription: "Danışan ve içerik yönetimi için gelişmiş diyetisyen platformu",
      tech: ["Next.js", "TypeScript", "Tailwind", "MongoDB", "Cloudinary"],
      images: ["/images/diet-app.jpg", "/images/diet-app1.jpg"],
      demoUrl: "",
      codeUrl: "",
    },
  ],
  en: [
    {
      id: 1,
      title: "Menu Leaf – Digital Menu Management",
      shortDescription: "Modern digital menu creation platform for restaurants and cafes",
      tech: ["Next.js", "TypeScript", "Nest.js", "PostgreSQL", "Docker", "JWT"],
      images: ["/images/nokta-kafe.jpg", "/images/doya-doya.jpg", "/images/menu-leaf.jpg"],
      demoUrl: "https://menu-leaf.com/tr",
      codeUrl: "",
    },
    {
      id: 2,
      title: "Bilir Nakliyat – Professional Moving",
      shortDescription: "Modern web platform for insured and secure moving services",
      tech: ["Next.js", "React", "Node.js", "Express", "MongoDB"],
      images: ["/images/bilir-nakliyat1.jpg", "/images/bilir-nakliyat2.jpg"],
      demoUrl: "https://bilirnakliyat.net",
      codeUrl: "",
    },
    {
      id: 3,
      title: "Tabu Epic – Word Game",
      shortDescription: "Fun team-based word guessing mobile game application",
      tech: ["React Native", "Express.js", "MongoDB", "AdMob"],
      images: ["/images/tabu-epic.png", "/images/tabu.jpg"],
      demoUrl: "",
      codeUrl: "",
    },
    {
      id: 4,
      title: "Dietitian Web System",
      shortDescription: "Advanced dietitian platform for client and content management",
      tech: ["Next.js", "TypeScript", "Tailwind", "MongoDB", "Cloudinary"],
      images: ["/images/diet-app.jpg", "/images/diet-app1.jpg"],
      demoUrl: "",
      codeUrl: "",
    },
  ],
};

export default function Projects() {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const projects = language === "tr" ? projectsData.tr : projectsData.en;
  const viewDemoText = language === "tr" ? "Demo" : "View Demo";
  const viewCodeText = language === "tr" ? "Kod" : "View Code";

  return (
    <section
      className={`${styles.container} ${theme === "dark" ? styles.darkTheme : ""}`}
      id="projects"
    >
      <h2 className={styles.title}>
        {language === "tr" ? "PROJELERİM" : "MY PROJECTS"}
      </h2>
      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.imageContainer}>
              <Image
                src={project.images[0]}
                alt={project.title}
                width={400}
                height={250}
                className={styles.projectImage}
              />
              <div className={styles.imageOverlay}></div>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.shortDescription}</p>

              <div className={styles.techStack}>
                {project.tech.map((tech, idx) => (
                  <span key={idx} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.cardActions}>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryBtn}
                  >
                    {viewDemoText}
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryBtn}
                  >
                    {viewCodeText}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
