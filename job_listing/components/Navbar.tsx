'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useFavorites } from '@/context/FavoriteContext';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { searchTerm, setSearchTerm } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-6 md:gap-8">
        
        <div className="flex items-center mb-4 md:mb-0">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight hover:text-blue-600 transition duration-300"
          >
            Precision<span className="text-blue-600">Jobs</span>
          </Link>
        </div>

        <div className="flex-grow flex items-center mb-4 md:mb-0 md:w-auto">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 text-sm border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        <button
          className="block md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div
          className={`absolute md:relative top-full left-0 w-full md:w-auto bg-gradient-to-r from-gray-50 to-gray-100 md:bg-transparent border-t md:border-0 border-gray-200 md:flex md:items-center ${
            menuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 px-4 py-4 md:py-0">
            <Link href="/" passHref>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                  pathname === '/'
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                    : 'text-gray-800 bg-gray-100 hover:bg-blue-100 hover:text-blue-600'
                }`}
              >
                All Jobs
              </button>
            </Link>
            <Link href="/favorites" passHref>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                  pathname === '/favorites'
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                    : 'text-gray-800 bg-gray-100 hover:bg-blue-100 hover:text-blue-600'
                }`}
              >
                Favorites
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
