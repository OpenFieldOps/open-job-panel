import { InterventionModel } from "backend/modules/intervention/model";

type InterventionStatusInfo = {
  title: string;
  status: InterventionModel.InterventionStatusEnum;
  description?: string;
};

export const interventionStatusInfo: InterventionStatusInfo[] = [
  {
    status: InterventionModel.InterventionStatusEnum.Scheduled,
    title: "Scheduled",
    description: "The intervention is scheduled and waiting to start.",
  },
  {
    status: InterventionModel.InterventionStatusEnum.Pending,
    title: "Pending",
    description: "The intervention is pending and awaiting action.",
  },
  {
    status: InterventionModel.InterventionStatusEnum.InProgress,
    title: "In Progress",
    description: "The intervention is currently in progress.",
  },
  {
    status: InterventionModel.InterventionStatusEnum.Completed,
    title: "Completed",
    description: "The intervention has been completed successfully.",
  },
];

export const interventionStatusNotCompleted: InterventionStatusInfo[] = [
  ...interventionStatusInfo.slice(0, -1),
];
