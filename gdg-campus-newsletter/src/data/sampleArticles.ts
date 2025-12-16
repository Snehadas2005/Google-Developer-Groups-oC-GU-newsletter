import { Article } from '@/types/article';

export const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    subtitle: 'How modern frameworks are reshaping the digital landscape',
    author: 'Sarah Chen',
    date: 'December 15, 2025',
    category: 'Technology',
    excerpt: 'An in-depth look at emerging trends in web development and what they mean for developers in 2026.',
    content: 'The landscape of web development continues to evolve at a remarkable pace. From the rise of edge computing to the refinement of component-based architectures, developers face both exciting opportunities and significant challenges. This transformation represents not merely a shift in tools, but a fundamental reimagining of how we build for the web. Server components, streaming SSR, and progressive enhancement have moved from experimental concepts to production-ready solutions. The implications extend far beyond technical implementation, touching on user experience, accessibility, and the very nature of how we think about web applications.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        alt: 'Modern web development workspace',
        caption: 'The tools of modern development'
      },
      {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        alt: 'Code on screen',
        caption: 'Building the future, one line at a time'
      }
    ],
    featured: true
  },
  {
    id: '2',
    title: 'AI Ethics in Practice',
    author: 'Marcus Johnson',
    date: 'December 14, 2025',
    category: 'Ethics',
    excerpt: 'Universities worldwide grapple with implementing ethical AI guidelines in research and teaching.',
    content: 'As artificial intelligence becomes increasingly integrated into academic life, questions of ethics and responsibility have moved to the forefront. How do we balance innovation with caution? What frameworks can guide responsible AI development? These questions define our era.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        alt: 'AI visualization',
        caption: 'The ethical dimensions of artificial intelligence'
      }
    ]
  },
  {
    id: '3',
    title: 'Campus Hackathon Breaks Records',
    author: 'Emily Rodriguez',
    date: 'December 13, 2025',
    category: 'Events',
    excerpt: 'Over 500 students participated in the largest campus hackathon to date, creating innovative solutions.',
    content: 'This year\'s annual hackathon shattered all previous participation records. Students from across departments collaborated on projects ranging from sustainable tech solutions to accessibility tools. The energy was palpable as teams worked through the night, fueled by creativity and pizza.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
        alt: 'Hackathon participants',
        caption: 'Teams collaborating during the 48-hour event'
      },
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        alt: 'Group collaboration',
        caption: 'Innovation through teamwork'
      }
    ]
  },
  {
    id: '4',
    title: 'Open Source Contributions Rising',
    author: 'David Kim',
    date: 'December 12, 2025',
    category: 'Community',
    excerpt: 'Student developers are making significant contributions to major open source projects.',
    content: 'The open source movement has found passionate advocates among university students. From documentation improvements to major feature additions, student contributions are being recognized by maintainers of leading projects. This trend signals a generation deeply committed to collaborative development.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=800',
        alt: 'GitHub contributions',
        caption: 'The pulse of open source development'
      }
    ]
  },
  {
    id: '5',
    title: 'Cloud Architecture Masterclass',
    author: 'Jennifer Park',
    date: 'December 11, 2025',
    category: 'Education',
    excerpt: 'Industry veterans share insights on designing scalable cloud-native applications.',
    content: 'Last week\'s masterclass on cloud architecture drew students eager to understand the principles behind scalable systems. Topics ranged from microservices design patterns to observability best practices, providing a comprehensive overview of modern cloud development.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        alt: 'Cloud computing visualization',
        caption: 'The architecture of tomorrow\'s systems'
      }
    ]
  }
];