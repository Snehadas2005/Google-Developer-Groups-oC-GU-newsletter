'use client';

import { useState, useEffect } from 'react';
import { sampleArticles } from '@/data/sampleArticles';

interface Article {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  imageCaption?: string;
  featured?: boolean;
  additionalImages?: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
  pullQuote?: string;
  galleryImages?: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
}

interface TypewriterTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
}

function TypewriterText({ text, speed = 15, startDelay = 0 }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (hasStarted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, hasStarted]);

  return <span>{displayText}</span>;
}

interface TypewriterArticleProps {
  article: Article;
  showContent: boolean;
}

function TypewriterArticle({ article, showContent }: TypewriterArticleProps) {
  const [visibleSections, setVisibleSections] = useState({
    category: false,
    title: false,
    subtitle: false,
    meta: false,
    image: false,
    content: false
  });

  useEffect(() => {
    if (showContent) {
      const timers = [
        setTimeout(() => setVisibleSections(prev => ({ ...prev, category: true })), 200),
        setTimeout(() => setVisibleSections(prev => ({ ...prev, title: true })), 400),
        setTimeout(() => setVisibleSections(prev => ({ ...prev, subtitle: true })), 600),
        setTimeout(() => setVisibleSections(prev => ({ ...prev, meta: true })), 800),
        setTimeout(() => setVisibleSections(prev => ({ ...prev, image: true })), 1000),
        setTimeout(() => setVisibleSections(prev => ({ ...prev, content: true })), 1400)
      ];

      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [showContent]);

  // Split content into paragraphs
  const paragraphs = article.content.split('\n\n');

  return (
    <>
      <header style={styles.articleHeader}>
        <div style={styles.headerTop}>
          <span style={{
            ...styles.categoryLarge,
            opacity: visibleSections.category ? 1 : 0,
            transition: 'opacity 0.6s ease'
          }}>
            {visibleSections.category && <TypewriterText text={article.category} speed={50} />}
          </span>
        </div>
        
        <h1 style={{
          ...styles.articleTitleLarge,
          opacity: visibleSections.title ? 1 : 0,
          transform: visibleSections.title ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.6s ease'
        }}>
          {visibleSections.title && <TypewriterText text={article.title} speed={30} />}
        </h1>
        
        {article.subtitle && (
          <h2 style={{
            ...styles.articleSubtitle,
            opacity: visibleSections.subtitle ? 1 : 0,
            transition: 'opacity 0.6s ease'
          }}>
            {visibleSections.subtitle && <TypewriterText text={article.subtitle} speed={25} />}
          </h2>
        )}
        
        <div style={{
          ...styles.articleMetaLarge,
          opacity: visibleSections.meta ? 1 : 0,
          transition: 'opacity 0.6s ease'
        }}>
          {visibleSections.meta && (
            <>
              <span><TypewriterText text={`By ${article.author}`} speed={40} /></span>
              <span style={styles.separator}>•</span>
              <span><TypewriterText text={article.date} speed={40} /></span>
            </>
          )}
        </div>
      </header>

      <figure style={{
        ...styles.featuredImage,
        opacity: visibleSections.image ? 1 : 0,
        transform: visibleSections.image ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.7s ease'
      }}>
        <img src={article.image} alt={article.title} style={styles.featuredImg} />
        <div style={styles.imageOverlay}></div>
        {article.imageCaption && (
          <figcaption style={styles.imageCaption}>
            {article.imageCaption}
          </figcaption>
        )}
      </figure>

      <div style={styles.articleBody}>
        {visibleSections.content && (
          <>
            {/* First Drop Cap Paragraph */}
            <div style={styles.bodyParagraph}>
              <span style={styles.dropCap}>{paragraphs[0]?.[0]}</span>
              <TypewriterText text={paragraphs[0]?.slice(1) || ''} speed={12} />
            </div>

            {/* Middle paragraphs with optional side images */}
            {paragraphs.slice(1, -1).map((para, idx) => (
              <div key={idx} style={styles.bodyParagraph}>
                <TypewriterText text={para} speed={12} />
                
                {/* Insert side image for every 2nd paragraph if available */}
                {idx % 2 === 0 && article.additionalImages?.[Math.floor(idx / 2)] && (
                  <figure style={styles.sideImage}>
                    <img 
                      src={article.additionalImages[Math.floor(idx / 2)].url} 
                      alt={article.additionalImages[Math.floor(idx / 2)].alt}
                      style={styles.sideImageImg}
                    />
                    {article.additionalImages[Math.floor(idx / 2)].caption && (
                      <figcaption style={styles.sideImageCaption}>
                        {article.additionalImages[Math.floor(idx / 2)].caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            ))}

            {/* Last paragraph with cursor */}
            {paragraphs.length > 1 && (
              <div style={styles.bodyParagraph}>
                <TypewriterText text={paragraphs[paragraphs.length - 1]} speed={12} />
                <span style={styles.cursor} />
              </div>
            )}

            {/* Pull Quote if available */}
            {article.pullQuote && (
              <blockquote style={styles.pullQuote}>
                <div style={styles.quoteDecor}>"</div>
                {article.pullQuote}
                <div style={styles.quoteDecor}>"</div>
              </blockquote>
            )}
          </>
        )}
      </div>

      {/* Full-width image grid at the bottom */}
      {article.galleryImages && article.galleryImages.length > 0 && (
        <div style={styles.imageGallery}>
          <div style={styles.galleryGrid}>
            {article.galleryImages.map((img, idx) => (
              <figure key={idx} style={styles.galleryItem}>
                <img src={img.url} alt={img.alt} style={styles.galleryImg} />
                {img.caption && (
                  <figcaption style={styles.galleryCaption}>
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles Box */}
      <aside style={styles.relatedBox}>
        <h3 style={styles.relatedTitle}>Related Stories</h3>
        <div style={styles.relatedDivider}></div>
        <ul style={styles.relatedList}>
          {sampleArticles
            .filter(a => a.id !== article.id)
            .slice(0, 3)
            .map(related => (
              <li key={related.id} style={styles.relatedItem}>
                <span style={styles.relatedCategory}>{related.category}</span>
                <div style={styles.relatedArticleTitle}>{related.title}</div>
              </li>
            ))}
        </ul>
      </aside>
    </>
  );
}

export default function NewsletterPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isArticleAnimating, setIsArticleAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleArticleClick = (article: Article) => {
    setIsArticleAnimating(true);
    setSelectedArticle(article);
    setTimeout(() => {
      setShowContent(true);
      setIsArticleAnimating(false);
    }, 500);
  };

  const handleBack = () => {
    setShowContent(false);
    setTimeout(() => {
      setSelectedArticle(null);
      setIsArticleAnimating(false);
    }, 300);
  };

  if (selectedArticle) {
    return (
      <div style={styles.page}>
        <div style={styles.texture}></div>
        
        <div style={{
          ...styles.articlePage,
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <button onClick={handleBack} style={styles.backButton}>
            ← Back to Stories
          </button>

          <TypewriterArticle article={selectedArticle} showContent={showContent} />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.texture}></div>
      
      <div style={styles.container}>
        <header style={styles.masthead}>
          <div style={styles.decorTop}>
            <div style={styles.decorLine}></div>
            <span style={styles.issueText}>University Edition</span>
            <div style={styles.decorLine}></div>
          </div>

          <h1 style={{
            ...styles.mainTitle,
            animation: 'fadeInDown 1s ease-out'
          }}>
            Google Developer Groups
          </h1>
          <p style={{
            ...styles.subtitle,
            animation: 'fadeIn 1s ease-out 0.3s backwards'
          }}>
            On Campus Galgotias University
          </p>

          <div style={{
            ...styles.metaInfo,
            animation: 'fadeIn 1s ease-out 0.5s backwards'
          }}>
            <span>{today}</span>
            <span style={styles.separator}>•</span>
            <span>Newsletter</span>
          </div>

          <div style={{
            ...styles.decorBottom,
            animation: 'fadeIn 1s ease-out 0.7s backwards'
          }}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{
                ...styles.decorSquare,
                animation: `popIn 0.5s ease-out ${0.9 + i * 0.1}s backwards`
              }}></div>
            ))}
          </div>
        </header>

        <div style={{
          ...styles.sectionHeader,
          animation: 'slideInLeft 0.8s ease-out 1.2s backwards'
        }}>
          <h2 style={styles.sectionTitle}>Latest Stories</h2>
          <div style={styles.sectionLine}></div>
        </div>

        <div style={styles.articlesGrid}>
          {sampleArticles.map((article, index) => (
            <article
              key={article.id}
              style={{
                ...styles.articleCard,
                animation: `fadeInUp 0.6s ease-out ${1.4 + index * 0.1}s backwards`
              }}
              onClick={() => handleArticleClick(article)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '8px 8px 0 rgba(107,62,94,0.35)';
                const img = e.currentTarget.querySelector('img');
                if (img) (img as HTMLImageElement).style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '4px 4px 0 rgba(107,62,94,0.2)';
                const img = e.currentTarget.querySelector('img');
                if (img) (img as HTMLImageElement).style.transform = 'scale(1)';
              }}
            >
              <div style={styles.imageWrapper}>
                <img
                  src={article.image}
                  alt={article.title}
                  style={styles.articleImage}
                />
                <div style={styles.imageOverlay}></div>
              </div>

              <div style={styles.articleContent}>
                <span style={styles.category}>{article.category}</span>
                <h3 style={styles.articleTitle}>{article.title}</h3>
                <p style={styles.excerpt}>{article.excerpt}</p>
                <div style={styles.articleMeta}>
                  <span>{article.author}</span>
                  <span style={styles.metaDot}>•</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0) rotate(45deg); }
          to { opacity: 1; transform: scale(1) rotate(45deg); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}} />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#FEDBB7',
    position: 'relative',
    overflow: 'hidden'
  },
  texture: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(107,62,94,0.03) 2px, rgba(107,62,94,0.03) 4px),
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(110,57,136,0.02) 2px, rgba(110,57,136,0.02) 4px)
    `,
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.6
  },
  container: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 40px'
  },
  masthead: {
    borderBottom: '4px solid #6B3E5E',
    paddingBottom: '40px',
    marginBottom: '60px',
    textAlign: 'center'
  },
  decorTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px'
  },
  decorLine: {
    width: '120px',
    height: '2px',
    background: 'linear-gradient(to right, transparent, #6E3988, transparent)'
  },
  issueText: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    color: '#6B3E5E',
    fontWeight: '600'
  },
  mainTitle: {
    fontFamily: 'Chomsky, serif',
    fontSize: '72px',
    fontWeight: 'bold',
    color: '#6E3988',
    marginBottom: '10px',
    lineHeight: '1',
    textShadow: '3px 3px 0 rgba(107,62,94,0.15)',
    letterSpacing: '2px'
  },
  subtitle: {
    fontFamily: '"Libre Baskerville", serif',
    fontSize: '24px',
    fontStyle: 'italic',
    color: '#6B3E5E',
    marginBottom: '30px',
    fontWeight: '400'
  },
  metaInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#6B3E5E',
    fontFamily: 'Arial, sans-serif'
  },
  separator: {
    color: '#FB9F4E',
    fontSize: '16px'
  },
  decorBottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '30px'
  },
  decorSquare: {
    width: '10px',
    height: '10px',
    backgroundColor: '#6E3988',
    transform: 'rotate(45deg)'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    marginBottom: '50px'
  },
  sectionTitle: {
    fontFamily: '"Libre Baskerville", serif',
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#6E3988',
    margin: 0,
    whiteSpace: 'nowrap'
  },
  sectionLine: {
    flex: 1,
    height: '3px',
    backgroundColor: '#6E3988'
  },
  articlesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '40px'
  },
  articleCard: {
    backgroundColor: '#FEFAF6',
    border: '2px solid #6B3E5E',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '4px 4px 0 rgba(107,62,94,0.2)'
  },
  imageWrapper: {
    position: 'relative',
    height: '240px',
    overflow: 'hidden',
    borderBottom: '2px solid #6B3E5E'
  },
  articleImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'sepia(0.3) contrast(1.1)',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 60%, rgba(254,219,183,0.3))',
    pointerEvents: 'none'
  },
  articleContent: {
    padding: '30px',
    backgroundColor: '#FEFAF6'
  },
  category: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#F08E3B',
    fontWeight: '600',
    display: 'block',
    marginBottom: '15px',
    fontFamily: 'Arial, sans-serif'
  },
  articleTitle: {
    fontFamily: '"Libre Baskerville", serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#6E3988',
    marginBottom: '15px',
    lineHeight: '1.3',
    transition: 'color 0.3s ease'
  },
  excerpt: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#6B3E5E',
    marginBottom: '20px'
  },
  articleMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#6B3E5E',
    fontFamily: 'Arial, sans-serif',
    paddingTop: '15px',
    borderTop: '1px solid rgba(107,62,94,0.2)'
  },
  metaDot: {
    color: '#FB9F4E'
  },
  articlePage: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 60px',
    backgroundColor: '#FEFAF6',
    minHeight: '100vh',
    boxShadow: '0 0 60px rgba(107,62,94,0.15)',
    border: '3px solid #6B3E5E',
    borderTop: 'none'
  },
  backButton: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    color: '#6E3988',
    backgroundColor: 'transparent',
    border: '2px solid #6E3988',
    padding: '12px 24px',
    cursor: 'pointer',
    marginBottom: '40px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '3px 3px 0 rgba(107,62,94,0.2)'
  },
  articleHeader: {
    marginBottom: '40px',
    paddingBottom: '30px',
    borderBottom: '3px solid #6E3988'
  },
  headerTop: {
    marginBottom: '20px'
  },
  categoryLarge: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#F08E3B',
    fontWeight: '600',
    display: 'inline-block',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'rgba(240,142,59,0.1)',
    padding: '5px 15px',
    border: '1px solid #F08E3B'
  },
  articleTitleLarge: {
    fontFamily: '"Libre Baskerville", serif',
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#6E3988',
    marginBottom: '20px',
    lineHeight: '1.2',
    textAlign: 'center'
  },
  articleSubtitle: {
    fontFamily: '"Libre Baskerville", serif',
    fontSize: '22px',
    fontStyle: 'italic',
    color: '#6B3E5E',
    marginBottom: '25px',
    lineHeight: '1.4',
    textAlign: 'center'
  },
  articleMetaLarge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#6B3E5E',
    fontFamily: 'Arial, sans-serif'
  },
  featuredImage: {
    margin: '0 0 15px 0',
    position: 'relative',
    border: '3px solid #6B3E5E',
    overflow: 'hidden'
  },
  featuredImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
    filter: 'sepia(0.25) contrast(1.1)'
  },
  imageCaption: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '13px',
    fontStyle: 'italic',
    color: '#6B3E5E',
    padding: '10px 15px',
    backgroundColor: 'rgba(107,62,94,0.05)',
    borderTop: '1px solid #6B3E5E'
  },
  articleBody: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '17px',
    lineHeight: '1.8',
    color: '#2a2a2a',
    columnCount: 2,
    columnGap: '40px',
    columnRule: '1px solid rgba(107,62,94,0.2)'
  },
  bodyParagraph: {
    marginBottom: '20px',
    textAlign: 'justify',
    position: 'relative'
  },
  dropCap: {
    float: 'left',
    fontFamily: '"Libre Baskerville", serif',
    fontSize: '72px',
    lineHeight: '60px',
    fontWeight: 'bold',
    color: '#6E3988',
    marginRight: '8px',
    marginTop: '5px'
  },
  cursor: {
    display: 'inline-block',
    width: '2px',
    height: '1em',
    backgroundColor: '#6E3988',
    marginLeft: '2px',
    animation: 'blink 1s infinite',
    verticalAlign: 'middle'
  },
  sideImage: {
    float: 'right',
    width: '45%',
    margin: '10px 0 15px 20px',
    border: '2px solid #6B3E5E'
  },
  sideImageImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
    filter: 'sepia(0.2) contrast(1.05)'
  },
  sideImageCaption: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    fontStyle: 'italic',
    color: '#6B3E5E',
    padding: '8px 10px',
    backgroundColor: 'rgba(107,62,94,0.05)',
    borderTop: '1px solid #6B3E5E'
  },
  pullQuote: {
    fontFamily: '"Libre Baskerville", serif',
    fontSize: '24px',
    fontStyle: 'italic',
    color: '#6E3988',
    borderTop: '3px solid #6E3988',
    borderBottom: '3px solid #6E3988',
    padding: '30px 40px',
    margin: '30px 0',
    textAlign: 'center',
    position: 'relative'
  },
  quoteDecor: {
    fontFamily: 'Chomsky, serif',
    fontSize: '48px',
    color: '#FB9F4E',
    lineHeight: '1'
  },
  imageGallery: {
    marginTop: '40px'
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  galleryItem: {
    border: '2px solid #6B3E5E',
    overflow: 'hidden'
  },
  galleryImg: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    display: 'block',
    filter: 'sepia(0.2) contrast(1.05)'
  },
  galleryCaption: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '11px',
    fontStyle: 'italic',
    color: '#6B3E5E',
    padding: '8px 10px',
    backgroundColor: 'rgba(107,62,94,0.05)',
    borderTop: '1px solid #6B3E5E'
  },
  relatedBox: {
    marginTop: '50px',
    padding: '25px',
    border: '3px solid #6E3988',
    backgroundColor: 'rgba(110,57,136,0.05)'
  },
  relatedTitle: {
    fontFamily: '"Libre Baskerville", serif',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#6E3988',
    marginBottom: '15px'
  },
  relatedDivider: {
    width: '60px',
    height: '3px',
    backgroundColor: '#F08E3B',
    marginBottom: '20px'
  },
  relatedList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  relatedItem: {
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid rgba(107,62,94,0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  relatedCategory: {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#F08E3B',
    display: 'block',
    marginBottom: '5px',
    fontFamily: 'Arial, sans-serif'
  },
  relatedArticleTitle: {
    fontSize: '14px',
    color: '#6E3988',
    fontFamily: '"Libre Baskerville", serif',
    fontWeight: 'bold',
    lineHeight: '1.4'
  }
};