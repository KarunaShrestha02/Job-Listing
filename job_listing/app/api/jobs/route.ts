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
  // Add more job listings as needed
]

export async function GET() {
  return NextResponse.json(jobs)
}

