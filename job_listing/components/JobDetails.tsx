'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import ApplyFormModal from './ApplyFormModal';
import { useFavorites } from '@/context/FavoriteContext';

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
};

type JobDetailsProps = {
  job: Job;
};

export default function JobDetails({ job }: JobDetailsProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(job.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const renderJobDescription = (description: string) => {
    const lines = description.split('\n');
    return lines.map((line, index) => {
      if (line.toLowerCase().includes("required skills") || line.toLowerCase().includes("qualifications")) {
        return (
          <p key={index} className="font-semibold text-gray-800">
            {line}
          </p>
        );
      } else {
        return (
          <p key={index} className="text-gray-700">{line}</p>
        );
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      <div className="text-center mb-2"> 
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">{job.title}</h1>
        <p className="text-lg sm:text-xl text-gray-600">{job.company}</p>
        <p className="text-base sm:text-lg text-gray-500 mt-1">{job.location}</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-2"> 
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 text-center">
          Job Description
        </h2>
        <div className="prose text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
          {renderJobDescription(job.description)}
        </div>
      </div>

      
      <div className="flex flex-wrap gap-4 items-center justify-between mt-6">
        <div className="flex flex-wrap items-center gap-4">
          
          <Button
            onClick={() => toggleFavorite(job.id)}
            variant={isFavorite ? 'default' : 'outline'}
            className={`${
              isFavorite
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-gray-50'
            } transition-all duration-200 ease-in-out px-4 py-2 rounded-lg flex items-center gap-2`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 ease-in-out px-4 py-2 rounded-lg"
          >
            Apply Now
          </Button>
        </div>
      </div>
      <ApplyFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} jobId={job.id} />
    </div>
  );
}
