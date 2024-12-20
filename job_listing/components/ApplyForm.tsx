'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { db, ref, set } from '@/components/config/firebase';  

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  resume: z.any().optional(),  
  coverLetter: z.string().min(50, {
    message: 'Cover letter must be at least 50 characters.',
  }),
});

type ApplyFormProps = {
  jobId: string;
  onSuccess: () => void;
};

export default function ApplyForm({ jobId, onSuccess }: ApplyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState<File | null>(null); // Add state for file input

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      coverLetter: '',
      resume: '', // Initialize as an empty string
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const applicationRef = ref(db, 'applications/' + new Date().getTime());  

      await set(applicationRef, {
        ...values,
        resume, // Include the file state
        jobId,
        submittedAt: new Date().toISOString(),
      });

      console.log('Application submitted:', { ...values, resume, jobId });

      onSuccess();
    } catch (error) {
      console.error('Failed to submit application', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 shadow-md rounded-lg p-6 border border-gray-200 max-w-xl mx-auto lg:max-w-3xl"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@example.com"
                  {...field}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel className="text-gray-700 font-medium">Resume (Optional)</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files?.[0] || null)} // Handle file input manually
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </FormControl>
          <FormDescription className="text-gray-500 text-sm">
            Upload your resume (PDF, DOC, or DOCX)
          </FormDescription>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Cover Letter</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your cover letter here..."
                  {...field}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-indigo-600 hover:to-blue-600 font-medium py-2 rounded-md transition-all"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>
    </Form>
  );
}
