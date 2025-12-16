import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Article } from '@/types/article';
import { TypewriterText } from './TypewriterText';

interface ArticlePanelProps {
  article: Article | null;
  onClose: () => void;
}

export function ArticlePanel({ article, onClose }: ArticlePanelProps) {
  if (!article) return null;

  return (
    <AnimatePresence>
      <motion.div
        layoutId={`article-${article.id}`}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200
        }}
        className="fixed right-0 top-0 bottom-0 w-full md:w-[700px] bg-[#faf8f3] shadow-2xl overflow-y-auto z-50"
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/textures/paper.png')] mix-blend-multiply" />

        <div className="relative">
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white border border-[#e0ddd6] transition-colors z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5 text-[#2a2a2a]" />
          </motion.button>

          {/* Content */}
          <div className="px-12 py-16 max-w-[600px]">
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="text-xs uppercase tracking-wider text-[#6a6a6a]">
                {article.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-['Libre_Baskerville'] text-4xl font-bold leading-tight mb-4 text-[#2a2a2a]"
            >
              {article.title}
            </motion.h1>

            {/* Subtitle */}
            {article.subtitle && (
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-['Libre_Baskerville'] text-xl text-[#6a6a6a] mb-6 leading-relaxed"
              >
                {article.subtitle}
              </motion.h2>
            )}

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 pb-6 mb-8 border-b border-[#e0ddd6]"
            >
              <span className="text-xs uppercase tracking-wider text-[#6a6a6a]">
                By {article.author}
              </span>
              <span className="text-[#e0ddd6]">•</span>
              <span className="text-xs uppercase tracking-wider text-[#6a6a6a]">
                {article.date}
              </span>
            </motion.div>

            {/* First image */}
            {article.images[0] && (
              <motion.figure
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-10 relative"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.images[0].url}
                    alt={article.images[0].alt}
                    className="w-full h-auto"
                    style={{
                      filter: 'grayscale(20%) contrast(1.1) brightness(0.95) sepia(8%)'
                    }}
                  />
                  <div className="absolute inset-0 bg-[url('/textures/paper.png')] mix-blend-multiply opacity-15" />
                </div>
                {article.images[0].caption && (
                  <figcaption className="mt-3 text-xs text-[#6a6a6a] italic">
                    {article.images[0].caption}
                  </figcaption>
                )}
              </motion.figure>
            )}

            {/* Body text with typewriter effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="article-body"
            >
              <TypewriterText
                text={article.content}
                className="text-base leading-[1.75] text-[#2a2a2a] mb-6"
                speed={0.015}
              />
            </motion.div>

            {/* Additional images */}
            {article.images.slice(1).map((image, idx) => (
              <motion.figure
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + idx * 0.2 }}
                className="my-10 relative"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-auto"
                    style={{
                      filter: 'grayscale(20%) contrast(1.1) brightness(0.95) sepia(8%)'
                    }}
                  />
                  <div className="absolute inset-0 bg-[url('/textures/paper.png')] mix-blend-multiply opacity-15" />
                </div>
                {image.caption && (
                  <figcaption className="mt-3 text-xs text-[#6a6a6a] italic">
                    {image.caption}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}