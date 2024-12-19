'use client'; 

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 
import Link from 'next/link';
import { Job } from './types'; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFavorites } from '@/context/FavoriteContext';

const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 10;

type JobListingsProps = {
  initialJobs?: Job[];
  showOnlyFavorites?: boolean;
};

export default function JobListings({ initialJobs = [], showOnlyFavorites = false }: JobListingsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { favorites, searchTerm } = useFavorites();

  
  useEffect(() => {
    const pageFromUrl = searchParams.get('page');
    if (pageFromUrl) {
      setCurrentPage(Number(pageFromUrl));
    }
  }, [searchParams]);


  const filteredJobs = useMemo(() => {
    return (initialJobs || []).filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFavorites = showOnlyFavorites ? favorites.includes(job.id) : true;
      return matchesSearch && matchesFavorites;
    });
  }, [initialJobs, searchTerm, favorites, showOnlyFavorites]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  if (filteredJobs.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-12">
        No jobs found. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12 px-4">
        {currentJobs.map((job) => (
          <Card
            key={job.id}
            className="
              transform transition-all hover:scale-105 
              duration-300 ease-in-out bg-gradient-to-r 
              from-gray-50 to-gray-100 shadow-md rounded-lg 
              overflow-hidden hover:shadow-lg hover:border-blue-500
            "
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 tracking-wide truncate">
                {job.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500 truncate">{job.location}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/job/${job.id}`} passHref>
                <Button className="
                  w-full bg-gradient-to-r from-blue-500 
                  to-indigo-500 text-white font-medium 
                  hover:from-indigo-600 hover:to-blue-600 
                  transition-all duration-300 ease-in-out hover:shadow-lg
                ">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 sm:space-x-4 mt-8 px-4">
          <Button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            className="
              w-16 sm:w-20 md:w-24 transform transition-all hover:scale-105 
              duration-200 ease-in-out border-2 border-gray-400 
              hover:bg-gray-200 disabled:opacity-50
            "
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span className="text-xs sm:text-sm md:text-base truncate">Previous</span>
          </Button>

          {renderPageNumbers().map((pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              variant={currentPage === pageNumber ? 'default' : 'outline'}
              className={`transition-all transform hover:scale-110 duration-200 ease-in-out w-8 h-8 ${
                currentPage === pageNumber
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                  : 'border-2 border-gray-300'
              }`}
            >
              {pageNumber}
            </Button>
          ))}

          <Button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            className="
              w-16 sm:w-20 md:w-24 transform transition-all hover:scale-110 
              duration-200 ease-in-out border-2 border-gray-400 
              hover:bg-gray-200 disabled:opacity-50
            "
          >
            <span className="text-xs sm:text-sm md:text-base truncate">Next</span>
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
