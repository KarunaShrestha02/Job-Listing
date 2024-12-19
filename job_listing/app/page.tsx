import JobListings from '@/components/JobListings'
import jobsData from '@/data/jobs.json'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">All Jobs</h1>
        <JobListings initialJobs={jobsData.jobs} />
      </div>
    </main>
  )
}

