import { Badge } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/model";
import { jobStatusInfo } from "../constant";

type JobStatusBadgeProps = {
  status: JobModel.JobStatusEnum;
};

function getBadgeText(status: JobModel.JobStatusEnum): string {
  return (
    jobStatusInfo.find((info) => info.status === status)?.title || "Unknown"
  );
}

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  return (
    <Badge bg={"Background"} variant={"outline"}>
      {getBadgeText(status)}
    </Badge>
  );
}
