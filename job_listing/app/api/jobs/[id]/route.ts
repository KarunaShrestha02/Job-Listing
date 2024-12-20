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


export async function handler(request: Request, { params }: { params: { id: string } }) {
 
  if (request.method === 'GET') {
    const job = jobs.find((job) => job.id === params.id)

    if (!job) {
      return new NextResponse('Job not found', { status: 404 })
    }

    return NextResponse.json(job)
  }

  if (request.method === 'POST') {
    const newJob = await request.json() 
    jobs.push(newJob)

    return new NextResponse('Job added successfully', { status: 201 })
  }

 
  return new NextResponse('Method Not Allowed', { status: 405 })
}
