import Header from '@/components/layout/header';
import ReactQueryProvider from '@/providers/query-provider';
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
        <ReactQueryProvider>
          <Header />
          <main>
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}