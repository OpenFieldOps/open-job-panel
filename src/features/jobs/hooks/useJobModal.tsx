import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DialogContent } from "@/components/dialog/ButtonDialog";
import { useIsMobile } from "@/hooks/useIsMobile";
import JobDialogContent from "../components/JobDialogContent/JobDialogContent";

export function useJobModal() {
  const [jobId, setJobId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const JobEdit = () =>
    !isMobile && (
      <DialogContent open={open} setOpen={setOpen}>
        {jobId && (
          <JobDialogContent jobId={jobId} onSave={() => setOpen(false)} />
        )}
      </DialogContent>
    );

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
    JobEdit,
    openJob,
  };
}
