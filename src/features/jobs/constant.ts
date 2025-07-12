import { JobModel } from "backend/modules/job/model";

type JobStatusInfo = {
  title: string;
  status: JobModel.JobStatusEnum;
  description?: string;
};

export const jobStatusInfo: JobStatusInfo[] = [
  {
    status: JobModel.JobStatusEnum.Scheduled,
    title: "Scheduled",
    description: "The Job is scheduled and waiting to start.",
  },
  {
    status: JobModel.JobStatusEnum.Pending,
    title: "Pending",
    description: "The Job is pending and awaiting action.",
  },
  {
    status: JobModel.JobStatusEnum.InProgress,
    title: "In Progress",
    description: "The Job is currently in progress.",
  },
  {
    status: JobModel.JobStatusEnum.Completed,
    title: "Completed",
    description: "The Job has been completed successfully.",
  },
];

export const jobStatusNotCompleted: JobStatusInfo[] = [
  ...jobStatusInfo.slice(0, -1),
];
