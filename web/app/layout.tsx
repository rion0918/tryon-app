// web/app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import ClientLayout from './components/ClientLayout';

export const metadata: Metadata = {
  title: '仮装試着アプリ - TryOn',
  description: '購入前に服を仮想試着できるアプリ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}