// web/app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Providers } from './providers';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: '仮装試着アプリ - TryOn',
  description: '購入前に服を仮想試着できるアプリ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}