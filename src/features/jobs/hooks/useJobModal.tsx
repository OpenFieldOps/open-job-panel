import { useDialog } from "@chakra-ui/react";
import { useState } from "react";
import { DialogContent } from "@/components/dialog/ButtonDialog";
import JobDialogContent from "../components/JobDialogContent";

export function useJobModal() {
  const [jobId, setJobId] = useState<number | null>(null);
  const dialog = useDialog();

  const modal = (
    <DialogContent dialogState={dialog}>
      {jobId && (
        <JobDialogContent jobId={jobId} onSave={() => dialog.setOpen(false)} />
      )}
    </DialogContent>
  );

  return {
    modal,
    openJob: (jobId: number) => {
      setJobId(jobId);
      dialog.setOpen(true);
    },
  };
}
