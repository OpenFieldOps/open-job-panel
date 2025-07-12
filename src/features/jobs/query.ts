import { QueryCacheKey } from "@/app/queryClient";
import {
  apiClient,
  apiQueryCacheListUpdate,
  apiQueryCacheSingleUpdate,
  apiQueryCacheSingleUpdateList,
  ok,
  structuredUpdateFunc,
} from "@/lib/apiClient";
import type { JobEventCalendar } from "./hooks/useJobList";
import type { JobModel } from "backend/modules/job/model";
import { toaster } from "@/components/ui/contants";

export function deleteJob(jobId: number, onSuccess: () => void) {
  apiClient
    .job({ id: jobId })
    .delete()
    .then((res) => {
      if (ok(res)) {
        onSuccess();
        apiQueryCacheListUpdate(
          QueryCacheKey.JobList,
          (oldData: JobEventCalendar[]) =>
            oldData.filter((el) => el.extendedProps.id !== jobId)
        );
      }
      // TODO: Handle error
    });
}

export async function updateJob(
  body: JobModel.JobUpdateBody,
  onSucess?: () => void
) {
  const res = await apiClient.job.patch(body);

  if (ok(res)) {
    apiQueryCacheSingleUpdate(
      QueryCacheKey.Job,
      body.id,
      structuredUpdateFunc(body)
    );

    apiQueryCacheSingleUpdateList<JobEventCalendar>(
      QueryCacheKey.JobList,
      body.id,
      (old) => ({
        ...old,
        start: body.startDate ? body.startDate : old.start,
        end: body.endDate ? body.endDate : old.end,
        extendedProps: {
          ...old.extendedProps,
          ...body,
        },
      })
    );
    toaster.success({
      title: "Job updated",
    });
    if (onSucess) {
      onSucess();
    }
  }
}
