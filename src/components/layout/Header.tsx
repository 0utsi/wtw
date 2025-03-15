'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-blue-400 text-white shadow-md absolute z-100 w-full">
      <nav className="container mx-auto md:px-4 md:py-4 px-2 py-2 flex justify-between items-center">
        <div className="md:text-xl text-md font-bold">Mapa Pogodowa</div>
        <ul className="flex space-x-3 md:space-x-6">
          <li>
            <Link 
              href="/" 
              className={`hover:underline transition-colors ${
                pathname === '/' ? 'border-1 border-white sm:p-2 p-1 rounded-md font-medium' : ''
              }`}
            >
              Mapa
            </Link>
          </li>
          <li>
            <Link 
              href="/history" 
              className={`hover:underline transition-colors ${
                pathname === '/history' ? 'border-1 border-white sm:p-2 p-1  rounded-md font-medium' : ''
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