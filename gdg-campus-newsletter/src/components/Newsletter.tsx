'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Masthead } from './Masthead';
import { ArticleBelt } from './ArticleBelt';
import { ArticlePanel } from './ArticlePanel';
import { Article } from '@/types/article';

interface NewsletterProps {
  articles: Article[];
  issueNumber?: string;
  date: string;
}

export function Newsletter({ articles, issueNumber, date }: NewsletterProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-[#faf8f3] relative">
      {/* Paper texture overlay for entire page */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('/textures/paper.png')]" />

      <div className="relative">
        <div className="pt-16">
          <Masthead issueNumber={issueNumber} date={date} />
        </div>

        {/* Featured section (optional) */}
        {articles.find(a => a.featured) && (
          <FeaturedArticle
            article={articles.find(a => a.featured)!}
            onClick={() => setSelectedArticle(articles.find(a => a.featured)!)}
          />
        )}

        {/* Section header */}
        <div className="px-20 mb-8">
          <div className="flex items-center gap-4">
            <h2 className="font-['Libre_Baskerville'] text-3xl font-bold text-[#2a2a2a]">
              Latest Stories
            </h2>
            <div className="flex-1 h-[2px] bg-[#2a2a2a]" />
          </div>
        </div>

        {/* Scrolling article belt */}
        <ArticleBelt
          articles={articles.filter(a => !a.featured)}
          onArticleClick={setSelectedArticle}
          isDimmed={!!selectedArticle}
        />

        {/* Backdrop overlay */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setSelectedArticle(null)}
            />
          )}
        </AnimatePresence>

        {/* Expanded article panel */}
        <ArticlePanel
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      </div>
    </div>
  );
}

// Featured article component
function FeaturedArticle({ article, onClick }: { article: Article; onClick: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="px-20 mb-16 cursor-pointer group"
      onClick={onClick}
    >
      <div className="border-2 border-[#2a2a2a] p-12 bg-white/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/textures/paper.png')] mix-blend-multiply" />
        
        <div className="relative grid md:grid-cols-2 gap-12">
          {/* Image */}
          {article.images[0] && (
            <div className="relative overflow-hidden">
              <motion.img
                src={article.images[0].url}
                alt={article.images[0].alt}
                className="w-full h-full object-cover"
                style={{
                  filter: 'grayscale(20%) contrast(1.1) brightness(0.95) sepia(8%)'
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-[url('/textures/paper.png')] mix-blend-multiply opacity-15" />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col justify-center">
            <span className="text-xs uppercase tracking-wider text-[#6a6a6a] mb-3">
              Featured · {article.category}
            </span>
            
            <h2 className="font-['Libre_Baskerville'] text-4xl font-bold leading-tight mb-4 text-[#2a2a2a] group-hover:text-[#8b4513] transition-colors">
              {article.title}
            </h2>
            
            <p className="text-lg leading-relaxed text-[#6a6a6a] mb-6">
              {article.excerpt}
            </p>
            
            <div className="flex items-center gap-4 text-xs uppercase tracking-wider text-[#6a6a6a]">
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