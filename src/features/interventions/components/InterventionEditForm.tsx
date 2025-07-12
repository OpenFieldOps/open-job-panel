import { QueryCacheKey } from "@/app/queryClient";
import FormTemplate from "@/components/block/FormTemplate";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import {
  apiClient,
  apiQueryCacheSingleUpdate,
  apiQueryCachSingleUpdateList,
  ok,
} from "@/lib/apiClient";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { InterventionModel } from "backend/modules/intervention/model";
import { useForm } from "react-hook-form";
import { InterventionStatusStep } from "./InterventionStatusStep";
import type { InterventionEventCalendar } from "../hooks/useInterventionList";
import { useEffect, useState } from "react";
import { deleteIntervention } from "../query";

type InterventionEditFormProps = {
  interventionId: number;
  onSave: () => void;
};

export function InterventionEditForm({
  interventionId,
  onSave,
}: InterventionEditFormProps) {
  const { isLoading, data } = useQuery({
    queryKey: [QueryCacheKey.Intervention, interventionId],
    queryFn: () => apiClient.intervention({ id: interventionId }).get(),
  });

  const [status, setStatus] =
    useState<InterventionModel.InterventionStatusString>("pending");

  useEffect(() => {
    setStatus(data?.data?.status || "pending");
  }, [data?.data?.status]);

  const { handleSubmit, register } =
    useForm<InterventionModel.InterventionUpdateBody>();

  const onSubmit = (input: InterventionModel.InterventionUpdateBody) => {
    apiClient.intervention
      .patch({
        id: interventionId,
        title: input.title,
        description: input.description,
        status: status as InterventionModel.InterventionStatusEnum,
      })
      .then((res) => {
        if (ok(res)) {
          apiQueryCacheSingleUpdate(
            QueryCacheKey.Intervention,
            interventionId,
            (oldData: InterventionModel.Intervention) => ({
              ...oldData,
              ...input,
              status,
            })
          );

          apiQueryCachSingleUpdateList<InterventionEventCalendar>(
            QueryCacheKey.InterventionList,
            interventionId,
            (el) => el.extendedProps.id,
            (el) => ({
              ...el,
              extendedProps: {
                ...el.extendedProps,
                ...input,
                status,
              },
            })
          );
          onSave();
        }
      });
  };

  if (isLoading) return <Spinner />;
  if (!data?.data?.id) return <div>Intervention not found</div>;

  return (
    <FormTemplate
      onDelete={() => deleteIntervention(data.data.id, onSave)}
      onSubmit={handleSubmit(onSubmit)}
      title="Edit intervention"
      confirmText="Save"
    >
      <InputWithLabel
        label="Title"
        placeholder="intervention title"
        defaultValue={data.data.title}
        {...register("title")}
      />
      <TextAreaWithLabel
        label="Description"
        placeholder="intervention description"
        defaultValue={data.data.description}
        {...register("description")}
      />
      <InterventionStatusStep
        interventionId={data.data.id}
        status={status}
        onChange={setStatus}
      />
    </FormTemplate>
  );
}
