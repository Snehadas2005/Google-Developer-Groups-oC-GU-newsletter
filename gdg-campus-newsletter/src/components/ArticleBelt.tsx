import { useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { ArticleCard } from './ArticleCard';
import { Article } from '@/types/article';

interface ArticleBeltProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  isDimmed?: boolean;
}

export function ArticleBelt({ articles, onArticleClick, isDimmed }: ArticleBeltProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  const CARD_WIDTH = 280;
  const GAP = 24;
  const totalWidth = articles.length * (CARD_WIDTH + GAP);

  return (
    <div 
      ref={constraintsRef}
      className={`relative overflow-hidden py-12 transition-opacity duration-500 ${
        isDimmed ? 'opacity-40 pointer-events-none' : 'opacity-100'
      }`}
    >
      <motion.div
        drag="x"
        dragConstraints={{
          left: -(totalWidth - window.innerWidth + 160),
          right: 160
        }}
        dragElastic={0.05}
        dragMomentum={true}
        dragTransition={{
          power: 0.2,
          timeConstant: 200,
          modifyTarget: (target) => {
            // Snap to nearest card
            const cardUnit = CARD_WIDTH + GAP;
            return Math.round(target / cardUnit) * cardUnit;
          }
        }}
        style={{ x }}
        className="flex gap-6 pl-20 pr-20 cursor-grab active:cursor-grabbing"
      >
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onClick={() => onArticleClick(article)}
          />
        ))}
      </motion.div>

      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#faf8f3] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#faf8f3] to-transparent pointer-events-none" />
    </div>
  );
}