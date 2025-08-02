import { useDialog } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { IconButtonDialog } from "@/components/dialog/ButtonDialog";
import OperatorCreateForm from "./OperatorCreateForm";

export default function OperatorCreateDialogTrigger() {
  const dialog = useDialog();
  return (
    <IconButtonDialog dialogState={dialog} icon={<Plus />}>
      <OperatorCreateForm
        onCreated={() => {
          dialog.setOpen(false);
        }}
      />
    </IconButtonDialog>
  );
}
