import { Tabs } from "@chakra-ui/react";
import { Edit, Folder, SquareCheck } from "lucide-react";
import { useUserRole } from "@/atoms/userAtom";
import OperatorJobEditForm from "@/features/operator/components/OperatorJobEdit";
import { JobEditForm } from "../JobEditForm";
import { JobDialogDocumentsTab } from "./tabs/JobDialogDocumentsTab";
import { JobDialogTasksTab } from "./tabs/JobDialogTaskTab";

type JobDialogContantProps = {
  jobId: number;
  onSave: () => void;
};

export default function JobDialogContent({
  jobId,
  onSave,
}: JobDialogContantProps) {
  const role = useUserRole();
  return (
    <Tabs.Root lazyMount defaultValue="edit" w={"full"}>
      <Tabs.List justifyContent={"center"}>
        <Tabs.Trigger value="edit">
          <Edit />
          Edit
        </Tabs.Trigger>
        <Tabs.Trigger value="documents">
          <Folder />
          Documents
        </Tabs.Trigger>
        <Tabs.Trigger value="tasks">
          <SquareCheck />
          Tasks
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="edit" justifyContent={"center"} w={"full"}>
        {role === "admin" ? (
          <JobEditForm jobId={jobId} onSave={onSave} />
        ) : (
          <OperatorJobEditForm jobId={jobId} onSave={onSave} />
        )}
      </Tabs.Content>
      <Tabs.Content value="documents">
        <JobDialogDocumentsTab jobId={jobId} />
      </Tabs.Content>
      <Tabs.Content value="tasks">
        <JobDialogTasksTab jobId={jobId} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
