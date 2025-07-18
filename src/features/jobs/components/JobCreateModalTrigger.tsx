import { useDialog } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { TriggeredDialog } from "@/components/dialog/ButtonDialog";
import JobCreateForm from "./JobCreateForm";

export default function JobCreateModalTrigger({ children }: PropsWithChildren) {
  const dialogState = useDialog();

  return (
    <TriggeredDialog dialogState={dialogState} trigger={children}>
      <JobCreateForm onCreated={() => dialogState.setOpen(false)} />
    </TriggeredDialog>
  );
}
