import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DialogContent } from "@/components/dialog/ButtonDialog";
import { useIsMobile } from "@/hooks/useIsMobile";
import { when } from "@/utils/conditionaly";
import JobDialogContent from "../components/JobDialogContent/JobDialogContent";

export function useJobModal() {
  const [jobId, setJobId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const JobEditMemo = useMemo(() => {
    return when(
      !isMobile && jobId !== null,
      <DialogContent open={open} setOpen={setOpen}>
        <JobDialogContent
          jobId={jobId as number}
          onSave={() => setOpen(false)}
        />
      </DialogContent>
    );
  }, [jobId, open, isMobile]);

  const navigate = useNavigate();

  const openJob = useMemo(() => {
    return (id: number) => {
      setJobId(id);
      if (isMobile) {
        navigate(`/private/jobs/${id}`);
        return;
      }
      setOpen(true);
    };
  }, [isMobile, navigate]);

  return {
    JobEdit: JobEditMemo,
    openJob,
  };
}
