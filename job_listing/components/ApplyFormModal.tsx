'use client'; 

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ApplyForm from './ApplyForm';

type ApplyFormModalProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  jobId: string;
};

export default function ApplyFormModal({ isOpen, onClose, jobId }: ApplyFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          w-full
          max-w-[95%]
          sm:max-w-md
          md:max-w-lg
          lg:max-w-xl
          xl:max-w-2xl
          bg-gray-50
          text-gray-900
          shadow-lg
          rounded-lg
          border
          border-gray-200
          p-4
          sm:p-6
          lg:p-8
          overflow-y-auto
          max-h-[90vh]
          mx-auto
        "
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-medium text-gray-800 sm:text-xl lg:text-2xl">
            Apply for Job
          </DialogTitle>
        </DialogHeader>
        <ApplyForm jobId={jobId} onSuccess={() => onClose(false)} />
      </DialogContent>
    </Dialog>
  );
}
