import FavoriteJobs from '@/components/FavoriteJobs'
import jobsData from '@/data/jobs.json'

export default function FavoritesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Favorite Jobs</h1>
        <FavoriteJobs jobs={jobsData.jobs} />
      </div>
    </main>
  )
}
