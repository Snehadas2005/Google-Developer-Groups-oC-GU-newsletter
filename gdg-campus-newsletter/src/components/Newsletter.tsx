"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Masthead } from "./Masthead";
import { ArticlePanel } from "./ArticlePanel";
import { Article } from "@/types/article";
import { sampleArticles } from "@/data/sampleArticles";

interface NewsletterProps {
  articles: Article[];
  issueNumber?: string;
  date: string;
}

export default function Newsletter({ articles, issueNumber = "001", date }: NewsletterProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const featuredArticle = articles.find((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#faf8f3",
        position: "relative",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      <div style={{ position: "relative", paddingTop: "64px" }}>
        <Masthead issueNumber={issueNumber} date={date} />

        {featuredArticle && (
          <FeaturedArticle
            article={featuredArticle}
            onClick={() => setSelectedArticle(featuredArticle)}
          />
        )}

        <div
          style={{
            paddingLeft: "80px",
            paddingRight: "80px",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "30px",
                fontWeight: 700,
                color: "#2a2a2a",
              }}
            >
              Latest Stories
            </h2>
            <div
              style={{ flex: 1, height: "2px", backgroundColor: "#2a2a2a" }}
            />
          </div>
        </div>

        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(4px)",
                zIndex: 40,
              }}
              onClick={() => setSelectedArticle(null)}
            />
          )}
        </AnimatePresence>

        <ArticlePanel
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      </div>
    </div>
  );
}

function FeaturedArticle({
  article,
  onClick,
}: {
  article: Article;
  onClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      style={{
        paddingLeft: "80px",
        paddingRight: "80px",
        marginBottom: "64px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div
        style={{
          border: "2px solid #2a2a2a",
          padding: "48px",
          backgroundColor: "rgba(255,255,255,0.5)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            position: "relative",
          }}
        >
          {article.images && article.images[0] && (
            <div style={{ position: "relative", overflow: "hidden" }}>
              <motion.img
                src={article.images[0].url}
                alt={article.images[0].alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter:
                    "grayscale(20%) contrast(1.1) brightness(0.95) sepia(8%)",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#6a6a6a",
                marginBottom: "12px",
              }}
            >
              Featured · {article.category}
            </span>

            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: "1.3",
                marginBottom: "16px",
                color: "#2a2a2a",
              }}
            >
              {article.title}
            </h2>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
                color: "#6a6a6a",
                marginBottom: "24px",
              }}
            >
              {article.excerpt}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#6a6a6a",
              }}
            >
              <span>{article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}