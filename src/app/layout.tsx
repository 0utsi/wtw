import QueryProvider from "../providers/query-provider";
import Header from "../components/layout/Header";
import { Toaster } from "../components/ui/sonner";

import "./globals.css";

export const metadata = {
  title: "Aplikacja Pogodowa",
  description: "Sprawdź pogodę w dowolnym miejscu na świecie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <QueryProvider>
          <Header />
          <main>{children}</main>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
