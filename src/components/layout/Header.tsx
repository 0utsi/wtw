"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapIcon } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-blue-400 text-white shadow-md absolute z-100 w-full">
      <nav className="container mx-auto md:px-4 md:py-4 px-3 py-5 flex sm:flex-row flex-col justify-between gap-3 items-center">
        <div className="md:text-xl text-md font-bold flex flex-row md:gap-4 gap:2 items-center font-[font2]">
          <MapIcon />
          Mapa Pogodowa
        </div>
        <ul className="flex space-x-4 md:space-x-6">
          <li>
            <Link
              href="/"
              className={`hover:underline transition-colors font-[font1] ${
                pathname === "/"
                  ? "underline underline-offset-2 md:underline-offset-5 font-semibold"
                  : ""
              }`}
            >
              Mapa
            </Link>
          </li>
          <li>
            <Link
              href="/history"
              className={`hover:underline transition-colors font-[font1] ${
                pathname === "/history"
                  ? "underline underline-offset-2 md:underline-offset-5 font-semibold"
                  : ""
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
