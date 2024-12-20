import { notFound } from 'next/navigation'
import JobDetails from '@/components/JobDetails'
import jobsData from '@/data/jobs.json'

export default function JobPage({ params }: { params: { id: string } }) {
  const job = jobsData.jobs.find(job => job.id === params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <JobDetails job={job} />
      </div>
    </div>
  )
}

