'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-blue-400 text-white shadow-md absolute z-100 w-full">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Mapa Pogodowa</div>
        <ul className="flex space-x-6">
          <li>
            <Link 
              href="/" 
              className={`hover:underline transition-colors ${
                pathname === '/' ? 'border-1 border-white p-2 rounded-md font-medium' : ''
              }`}
            >
              Mapa
            </Link>
          </li>
          <li>
            <Link 
              href="/history" 
              className={`hover:underline transition-colors ${
                pathname === '/history' ? 'border-1 border-white font-medium' : ''
              }`}
            >
              Historia i Statystyki
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}