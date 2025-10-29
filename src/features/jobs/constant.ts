import type { JobModel } from "backend/modules/job/JobModel";

type JobStatusInfo = {
  title: string;
  status: JobModel.JobStatusString;
  description?: string;
};

export const jobStatusInfo: JobStatusInfo[] = [
  {
    status: "scheduled",
    title: "Scheduled",
    description: "The Job is scheduled and waiting to start.",
  },
  {
    status: "pending",
    title: "Pending",
    description: "The Job is pending and awaiting action.",
  },
  {
    status: "inProgress",
    title: "In Progress",
    description: "The Job is currently in progress.",
  },
  {
    status: "completed",
    title: "Completed",
    description: "The Job has been completed successfully.",
  },
];

export const jobStatusInfoMap: Map<JobModel.JobStatusString, JobStatusInfo> =
  new Map(jobStatusInfo.map((status) => [status.status, status]));

export const jobStatusIndexMap: Record<JobModel.JobStatusString, number> = {
  scheduled: 0,
  pending: 1,
  inProgress: 2,
  completed: 3,
};

export const jobStatusNotCompleted: JobStatusInfo[] = [
  ...jobStatusInfo.slice(0, -1),
];
