// src/app/layout.tsx
import Header from '@/components/layout/Header';
import './globals.css';

export const metadata = {
  title: 'Aplikacja Pogodowa',
  description: 'Sprawdź pogodę w dowolnym miejscu na świecie',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <Header />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}