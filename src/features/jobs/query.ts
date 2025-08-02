import type { JobModel } from "backend/modules/job/model";
import { QueryCacheKey } from "@/app/queryClient";
import { appStore } from "@/app/store";
import { toaster } from "@/components/ui/contants";
import {
	type AppCacheKey,
	apiClient,
	apiQueryCacheListAdd,
	apiQueryCacheListDelete,
	apiQueryCacheListUpdate,
	apiQueryCacheSingleUpdate,
	apiQueryCacheSingleUpdateList,
	ok,
	structuredUpdateFunc,
} from "@/lib/apiClient";
import { jobSelectedPeriodAtom } from "./atoms";
import type { JobEventCalendar } from "./hooks/useJobList";

export function deleteJob(jobId: number, onSuccess: () => void) {
	apiClient
		.job({ id: jobId })
		.delete()
		.then((res) => {
			if (ok(res)) {
				onSuccess();
				apiQueryCacheListUpdate(
					getJobsListKey(),
					(oldData: JobEventCalendar[]) =>
						oldData.filter((el) => el.extendedProps.id !== jobId),
				);
				toaster.success({
					title: "Job deleted",
				});
			}
			// TODO: Handle error
		});
}

export function createJobTask(jobId: number, title: string, onOk: () => void) {
	apiClient.job.task
		.post({
			jobId,
			title,
		})
		.then((res) => {
			if (ok(res) && res.data) {
				apiQueryCacheListAdd([QueryCacheKey.JobTasks, jobId], res.data);
				onOk();
			}
		});
}

export function deleteJobTask(taskId: number, jobId: number, onOk: () => void) {
	apiClient.job["delete-task"]
		.delete({
			taskId,
			jobId,
		})
		.then((res) => {
			if (ok(res)) {
				apiQueryCacheListDelete([QueryCacheKey.JobTasks, jobId], taskId);
				onOk();
			}
		});
}

export function toggleJobTask(
	taskId: number,
	jobId: number,
	completed: boolean,
	onOk: () => void,
) {
	apiClient.job.task
		.patch({
			completed,
			id: taskId,
		})
		.then((res) => {
			if (ok(res)) {
				apiQueryCacheSingleUpdateList<JobModel.JobTask>(
					[QueryCacheKey.JobTasks, jobId] as const,
					taskId,
					structuredUpdateFunc({
						completed: completed,
					}),
				);
				onOk();
			}
		});
}

export function getJobsListKey(): AppCacheKey {
	const period = appStore.get(jobSelectedPeriodAtom);
	return [
		QueryCacheKey.JobList,
		period.start.date(),
		period.end.date(),
	] as const;
}

export async function updateJob(
	body: JobModel.JobUpdateBody,
	onSucess?: () => void,
) {
	const res = await apiClient.job.patch(body);

	if (ok(res)) {
		apiQueryCacheSingleUpdate(
			[QueryCacheKey.Job, body.id] as const,
			structuredUpdateFunc(body),
		);

		apiQueryCacheSingleUpdateList<JobEventCalendar>(
			getJobsListKey(),
			body.id,
			(old) => {
				if (!old) {
					throw new Error("Job not found in cache");
				}
				return {
					...old,
					id: old.id,
					start: body.startDate ? body.startDate : old.start,
					end: body.endDate ? body.endDate : old.end,
					extendedProps: {
						...old.extendedProps,
						...body,
					},
				};
			},
		);
		toaster.success({
			title: "Job updated",
		});
		if (onSucess) {
			onSucess();
		}
	}
}
