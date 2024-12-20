import { notFound } from 'next/navigation';
import JobDetails from '@/components/JobDetails';
import jobsData from '@/data/jobs.json';
import React from 'react';

export default async function JobPage({ params }: { params: { id: string } }) {
  
  const resolvedParams = await Promise.resolve(params);
  const jobId = resolvedParams.id;

  const job = jobsData.jobs.find((job) => job.id === jobId);

  
  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <JobDetails job={job} />
      </div>
    </div>
  );
}