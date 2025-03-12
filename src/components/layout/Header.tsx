import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-400 text-white shadow-md absolute z-100 w-full">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Mapa Pogodowa</div>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:underline">
              Mapa
            </Link>
          </li>
          <li>
            <Link href="/history" className="hover:underline">
              Historia i Statystyki
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}