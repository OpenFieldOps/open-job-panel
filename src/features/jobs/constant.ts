import type { JobModel } from "backend/modules/job/model";

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
		status: "in_progress",
		title: "In Progress",
		description: "The Job is currently in progress.",
	},
	{
		status: "completed",
		title: "Completed",
		description: "The Job has been completed successfully.",
	},
];

export const jobStatusNotCompleted: JobStatusInfo[] = [
	...jobStatusInfo.slice(0, -1),
];
