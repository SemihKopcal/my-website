"use client";

import React, { useState, useEffect } from "react";
import styles from "./admin.module.css";

export default function AdminPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage("Başarıyla güncellendi! / Updated successfully!");
      } else {
        setMessage("Bir hata oluştu. / An error occurred.");
      }
    } catch (error) {
      setMessage("Sunucu hatası. / Server error.");
    }
    setSaving(false);
  };

  if (loading) return <div className={styles.loading}>Yükleniyor...</div>;

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1>Admin Panel</h1>
        <button onClick={handleSave} disabled={saving} className={styles.saveBtn}>
          {saving ? "Kaydediliyor..." : "Tümünü Kaydet"}
        </button>
      </header>

      {message && <div className={styles.alert}>{message}</div>}

      <div className={styles.grid}>
        {/* Hero Section */}
        <section className={styles.section}>
          <h2>Hero Section</h2>
          <div className={styles.fieldGroup}>
            <h3>Turkish</h3>
            <input 
              value={content.hero.tr.name} 
              onChange={(e) => setContent({...content, hero: {...content.hero, tr: {...content.hero.tr, name: e.target.value}}})}
              placeholder="İsim"
            />
            <input 
              value={content.hero.tr.role} 
              onChange={(e) => setContent({...content, hero: {...content.hero, tr: {...content.hero.tr, role: e.target.value}}})}
              placeholder="Rol"
            />
            <textarea 
              value={content.hero.tr.intro} 
              onChange={(e) => setContent({...content, hero: {...content.hero, tr: {...content.hero.tr, intro: e.target.value}}})}
              placeholder="Giriş Metni"
            />
          </div>
          <div className={styles.fieldGroup}>
            <h3>English</h3>
            <input 
              value={content.hero.en.name} 
              onChange={(e) => setContent({...content, hero: {...content.hero, en: {...content.hero.en, name: e.target.value}}})}
              placeholder="Name"
            />
            <input 
              value={content.hero.en.role} 
              onChange={(e) => setContent({...content, hero: {...content.hero, en: {...content.hero.en, role: e.target.value}}})}
              placeholder="Role"
            />
            <textarea 
              value={content.hero.en.intro} 
              onChange={(e) => setContent({...content, hero: {...content.hero, en: {...content.hero.en, intro: e.target.value}}})}
              placeholder="Intro Text"
            />
          </div>
        </section>

        {/* Footer */}
        <section className={styles.section}>
          <h2>Footer Settings</h2>
          <div className={styles.fieldGroup}>
            <input 
              value={content.footer.year} 
              onChange={(e) => setContent({...content, footer: { year: e.target.value }})}
              placeholder="Yıl / Year"
            />
          </div>
        </section>

        {/* About Section */}
        <section className={styles.section}>
          <h2>About Section</h2>
          <div className={styles.fieldGroup}>
            <h3>Turkish Description</h3>
            <textarea 
              className={styles.largeArea}
              value={content.about.tr.description} 
              onChange={(e) => setContent({...content, about: {...content.about, tr: {...content.about.tr, description: e.target.value}}})}
            />
          </div>
          <div className={styles.fieldGroup}>
            <h3>English Description</h3>
            <textarea 
              className={styles.largeArea}
              value={content.about.en.description} 
              onChange={(e) => setContent({...content, about: {...content.about, en: {...content.about.en, description: e.target.value}}})}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
