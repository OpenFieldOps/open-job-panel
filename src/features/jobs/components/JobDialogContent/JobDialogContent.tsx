import { Tabs } from "@chakra-ui/react";
import { Edit, Folder, SquareCheck } from "lucide-react";
import { WithRole } from "@/features/guard/WithRole";
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
        <WithRole.admin>
          <JobEditForm jobId={jobId} onSave={onSave} />
        </WithRole.admin>
        <WithRole.operator>
          <OperatorJobEditForm jobId={jobId} onSave={onSave} />
        </WithRole.operator>
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
