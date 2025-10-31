import { Button, Heading } from "@chakra-ui/react";
import { lazy } from "react";
import { TriggeredDialog } from "@/components/dialog/ButtonDialog";
import AdminOperatorJobsModal from "../AdminOperatorJobsModal";

const OperatorMap = lazy(() => import("./OperatorMap"));

function OperatorLocationDialog() {
  return (
    <TriggeredDialog
      trigger={<Button>View Map</Button>}
      dialogRootProps={{
        size: "full",
      }}
      dialogContentprops={{
        height: "100%",
        width: "100%",
      }}
    >
      <Heading size="md" mb={4}>
        Operator Location
      </Heading>
      <OperatorMap />
    </TriggeredDialog>
  );
}

type UserCardProps = {
  userId: number;
};

export function AdminUserCardOperatorToolBar({ userId }: UserCardProps) {
  return (
    <>
      <AdminOperatorJobsModal operatorId={userId}>
        <Button>View Active Jobs</Button>
      </AdminOperatorJobsModal>
      <OperatorLocationDialog />
    </>
  );
}
