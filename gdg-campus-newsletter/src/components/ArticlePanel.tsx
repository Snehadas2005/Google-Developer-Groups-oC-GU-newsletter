import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Article } from '@/types/article';
import { TypewriterText } from './TypewriterText';

interface ArticlePanelProps {
  article: Article | null;
  onClose: () => void;
}

export function ArticlePanel({ article, onClose }: { article: Article | null; onClose: () => void }) {
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
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '700px',
          backgroundColor: '#faf8f3',
          boxShadow: '-10px 0 50px rgba(0,0,0,0.3)',
          overflowY: 'auto',
          zIndex: 50,
        }}
      >
        <div style={{ position: 'relative' }}>
          <motion.button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '32px',
              right: '32px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.8)',
              border: '1px solid #e0ddd6',
              cursor: 'pointer',
              zIndex: 10,
            }}
            whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
            whileTap={{ scale: 0.95 }}
          >
            ✕
          </motion.button>

          <div style={{ padding: '64px 48px', maxWidth: '600px' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: '16px' }}
            >
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6a6a6a' }}>
                {article.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '36px', fontWeight: 700, lineHeight: '1.2', marginBottom: '16px', color: '#2a2a2a' }}
            >
              {article.title}
            </motion.h1>

            {article.subtitle && (
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '20px', color: '#6a6a6a', marginBottom: '24px', lineHeight: '1.6' }}
              >
                {article.subtitle}
              </motion.h2>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '24px', marginBottom: '32px', borderBottom: '1px solid #e0ddd6' }}
            >
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6a6a6a' }}>
                By {article.author}
              </span>
              <span style={{ color: '#e0ddd6' }}>•</span>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6a6a6a' }}>
                {article.date}
              </span>
            </motion.div>

            {article.images[0] && (
              <motion.figure
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{ marginBottom: '40px' }}
              >
                <img
                  src={article.images[0].url}
                  alt={article.images[0].alt}
                  style={{ width: '100%', height: 'auto', filter: 'grayscale(20%) contrast(1.1) brightness(0.95) sepia(8%)' }}
                />
                {article.images[0].caption && (
                  <figcaption style={{ marginTop: '12px', fontSize: '12px', color: '#6a6a6a', fontStyle: 'italic' }}>
                    {article.images[0].caption}
                  </figcaption>
                )}
              </motion.figure>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <TypewriterText text={article.content} />
            </motion.div>

            {article.images.slice(1).map((image, idx) => (
              <motion.figure
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + idx * 0.2 }}
                style={{ marginTop: '40px', marginBottom: '40px' }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  style={{ width: '100%', height: 'auto', filter: 'grayscale(20%) contrast(1.1) brightness(0.95) sepia(8%)' }}
                />
                {image.caption && (
                  <figcaption style={{ marginTop: '12px', fontSize: '12px', color: '#6a6a6a', fontStyle: 'italic' }}>
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