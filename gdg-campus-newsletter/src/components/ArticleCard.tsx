import { motion } from 'framer-motion';
import { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  return (
    <motion.article
      layoutId={`article-${article.id}`}
      onClick={onClick}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: '280px',
        height: '360px',
        backgroundColor: '#faf8f3',
        border: '1px solid #e0ddd6',
        cursor: 'pointer',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      <div style={{ marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6a6a6a' }}>
          {article.category}
        </span>
      </div>

      <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '20px', fontWeight: 600, lineHeight: '1.4', marginBottom: '12px', color: '#2a2a2a' }}>
        {article.title}
      </h3>

      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#6a6a6a', marginBottom: '16px', flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
        {article.excerpt}
      </p>

      <div style={{ borderTop: '1px solid #e0ddd6', paddingTop: '12px' }}>
        <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6a6a6a' }}>
          {article.author} · {article.date}
        </p>
      </div>
    </motion.article>
  );
}
