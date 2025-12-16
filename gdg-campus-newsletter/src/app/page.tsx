import { Newsletter } from '@/components/Newsletter';
import { sampleArticles } from '@/data/sampleArticles';

export default function Home() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main>
      <Newsletter
        articles={sampleArticles}
        issueNumber="001"
        date={today}
      />
    </main>
  );
}