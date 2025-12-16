import { motion } from 'framer-motion';

interface MastheadProps {
  issueNumber?: string;
  date: string;
}

export function Masthead({ issueNumber = '001', date }: { issueNumber?: string; date: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      style={{
        borderBottom: '2px solid #2a2a2a',
        paddingBottom: '32px',
        marginBottom: '48px',
        paddingLeft: '80px',
        paddingRight: '80px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#e0ddd6' }} />
        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#6a6a6a' }}>
          Issue No. {issueNumber}
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#e0ddd6' }} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '56px', fontWeight: 700, color: '#2a2a2a', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          GDG on Campus
        </h1>
        <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '24px', color: '#6a6a6a', fontStyle: 'italic', marginBottom: '16px' }}>
          Weekly Chronicle
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6a6a6a' }}>
          <span>{date}</span>
          <span style={{ color: '#e0ddd6' }}>•</span>
          <span>University Edition</span>
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#2a2a2a',
              transform: 'rotate(45deg)',
            }}
          />
        ))}
      </div>
    </motion.header>
  );
}
