import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import './globals.css';

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-editorial',
});

export const metadata: Metadata = {
  title: 'GDG on Campus - Weekly Chronicle',
  description: 'Vintage newspaper-style newsletter for university tech community',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Chomsky font from CDN Fonts */}
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/chomsky" />
      </head>
      <body className={libreBaskerville.variable}>
        {children}
      </body>
    </html>
  );
}