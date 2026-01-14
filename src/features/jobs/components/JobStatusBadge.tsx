import { Badge } from "@chakra-ui/react";
import type { JobModel } from "backend/modules/job/JobModel";
import { jobStatusInfo } from "../constant";

type JobStatusBadgeProps = {
  status: JobModel.JobStatusString;
};

function getBadgeInfo(status: JobModel.JobStatusString) {
  return jobStatusInfo.find((info) => info.status === status);
}

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  const badgeInfo = getBadgeInfo(status);
  return (
    <Badge
      bg={"Background"}
      variant={"outline"}
      colorPalette={badgeInfo?.color}
    >
      {badgeInfo?.title || "Unknown"}
    </Badge>
  );
}
