import { motion } from 'framer-motion';
import { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <motion.article
      layoutId={`article-${article.id}`}
      onClick={onClick}
      className="relative flex-shrink-0 w-[280px] h-[360px] bg-[#faf8f3] border border-[#e0ddd6] cursor-pointer group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/textures/paper.png')] mix-blend-multiply" />
      
      <div className="relative p-6 h-full flex flex-col">
        {/* Category label */}
        <div className="mb-3">
          <span className="text-[11px] uppercase tracking-wider text-[#6a6a6a] font-normal">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-['Libre_Baskerville'] text-xl font-semibold leading-[1.4] mb-3 text-[#2a2a2a]">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed text-[#6a6a6a] mb-4 flex-grow line-clamp-4">
          {article.excerpt}
        </p>

        {/* Meta info */}
        <div className="border-t border-[#e0ddd6] pt-3 mt-auto">
          <p className="text-xs uppercase tracking-wider text-[#6a6a6a]">
            {article.author} · {article.date}
          </p>
        </div>
      </div>

      {/* Hover shadow effect */}
      <motion.div
        className="absolute inset-0 shadow-lg pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.article>
  );
}