import React from 'react';
import JobListings from './JobListings';
import { Job } from './types';

type FavoriteJobsProps = {
  jobs: Job[];
};

export default function FavoriteJobs({ jobs }: FavoriteJobsProps) {
  return (
    <div>
      
      <JobListings initialJobs={jobs} showOnlyFavorites={true} />
    </div>
  );
}
