import { Badge } from "@chakra-ui/react";
import { InterventionModel } from "backend/modules/intervention/model";
import { interventionStatusInfo } from "../constant";

type InterventionStatusBadgeProps = {
  status: InterventionModel.InterventionStatusEnum;
};

function getBadgeText(
  status: InterventionModel.InterventionStatusEnum
): string {
  return (
    interventionStatusInfo.find((info) => info.status === status)?.title ||
    "Unknown"
  );
}
export function InterventionStatusBadge({
  status,
}: InterventionStatusBadgeProps) {
  return (
    <>
      <Badge variant={"outline"} bg={"Background"}>
        {getBadgeText(status)}
      </Badge>
    </>
  );
}
