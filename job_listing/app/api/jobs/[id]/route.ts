import { NextResponse } from 'next/server'

const jobs = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    description: 'We are looking for a talented software engineer to join our team...',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateCo',
    location: 'New York, NY',
    description: 'Seeking an experienced product manager to lead our product development efforts...',
  },
  
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const job = jobs.find(job => job.id === params.id)
  
  if (!job) {
    return new NextResponse('Job not found', { status: 404 })
  }

  return NextResponse.json(job)
}

