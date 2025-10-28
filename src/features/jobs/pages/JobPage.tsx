import { Separator } from "@chakra-ui/react";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { OutlineIconButton } from "@/components/buttons/Button";
import PageContainer from "@/components/container/PageContainer";
import JobDialogContent from "../components/JobDialogContent/JobDialogContent";

export default function JobPage() {
  const { jobId } = useParams<"jobId">();
  const navigate = useNavigate();
  return (
    <PageContainer
      toolbar={{
        title: "Job Details",
        toolbar: (
          <OutlineIconButton onClick={() => navigate(-1)}>
            <X />
          </OutlineIconButton>
        ),
      }}
    >
      <JobDialogContent jobId={Number(jobId)} onSave={() => navigate(-1)} />
      <Separator />
    </PageContainer>
  );
}
