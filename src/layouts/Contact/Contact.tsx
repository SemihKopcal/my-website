"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseStatus, setResponseStatus] = useState<
    "success" | "error" | ""
  >("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "semihkopcal1@gmail.com",
          subject: formData.subject,
          text: `
    Gönderen: ${formData.fullName} <${formData.email}>
    Mesaj:
    ${formData.message}
  `,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg(
          language === "tr"
            ? "Mesaj başarıyla gönderildi!"
            : "Message sent successfully!"
        );
        setResponseStatus("success");
        setFormData({ fullName: "", email: "", subject: "", message: "" });
      } else {
        setResponseMsg(
          data.error ||
            (language === "tr"
              ? "Mesaj gönderilemedi."
              : "Failed to send message.")
        );
        setResponseStatus("error");
      }
    } catch {
      setResponseMsg(
        language === "tr"
          ? "Bir hata oluştu. Lütfen tekrar deneyin."
          : "An error occurred. Please try again."
      );
      setResponseStatus("error");
    }

    setTimeout(() => {
      setResponseMsg("");
      setResponseStatus("");
    }, 3000);

    setLoading(false);
  };

  return (
    <section
      className={`${styles.contactSection} ${
        theme === "dark" ? styles.darkTheme : ""
      }`}
      id="contact"
    >
      <div className={styles.left}>
        <Image
          className={styles.img}
          src={"/SemihKopcalPhotoCv.jpg"}
          width={300}
          height={300}
          alt="Contact-Image"
          priority
        />
        <h2 className={styles.contactTitle}>
          {language === "tr" ? "İletişime Geçin" : "Get in Touch"}
        </h2>
        <p className={styles.contactDescription}>
          {language === "tr"
            ? "Sizden haber almak isterim! Sorularınız, geri bildirimleriniz ya da sadece merhaba demek için bile olsa, lütfen benimle iletişime geçmekten çekinmeyin."
            : "I would love to hear from you! Whether you have questions, feedback, or just want to say hello, please don't hesitate to contact me."}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="fullName">
            {language === "tr" ? "AD SOYAD" : "FULL NAME"}
          </label>
          <input
            className={styles.inputField}
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">
            {language === "tr" ? "E-POSTA ADRESİ" : "EMAIL ADDRESS"}
          </label>
          <input
            className={styles.inputField}
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="subject">
            {language === "tr" ? "KONU" : "SUBJECT"}
          </label>
          <input
            className={styles.inputField}
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message">
            {language === "tr" ? "MESAJINIZ" : "YOUR MESSAGE"}
          </label>
          <textarea
            className={styles.textArea}
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
          aria-busy={loading}
        >
          {loading
            ? language === "tr"
              ? "Gönderiliyor..."
              : "Sending..."
            : language === "tr"
            ? "Mesaj Gönder ✉️"
            : "Send Message ✉️"}
        </button>

        {responseMsg && (
          <p
            className={styles.responseMessage}
            style={{
              color: responseStatus === "success" ? "#4BB543" : "#f1592a",
            }}
            role="alert"
          >
            {responseMsg}
          </p>
        )}
      </form>
    </section>
  );
}
