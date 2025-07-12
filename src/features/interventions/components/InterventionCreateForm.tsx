import { QueryCacheKey } from "@/app/queryClient";
import { useUserId } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import { apiClient, apiQueryCacheListUpdate, ok } from "@/lib/apiClient";
import type { InterventionModel } from "backend/modules/intervention/model";
import { useForm } from "react-hook-form";
import { interventionAsCalendarEvent } from "../atoms";
import type { InterventionEventCalendar } from "../hooks/useInterventionList";
import dayjs from "dayjs";

type Inputs = {
  title: string;
  description: string;
};

type InterventionCreateFormProps = {
  onCreated: () => void;
};

export default function InterventionCreateForm({
  onCreated,
}: InterventionCreateFormProps) {
  const userId = useUserId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = ({ title, description }: Inputs) => {
    apiClient.intervention
      .post({
        title,
        description,
        startDate: new Date().toISOString(),
        endDate: dayjs().add(3, "hour").toISOString(),
        assignedTo: userId,
      })
      .then((res) => {
        if (ok(res) && res.data) {
          const intervention: InterventionModel.Intervention = res.data;
          apiQueryCacheListUpdate(
            QueryCacheKey.InterventionList,
            (oldData: InterventionEventCalendar[]) => [
              ...oldData,
              interventionAsCalendarEvent(intervention, oldData.length),
            ]
          );
          onCreated();
        }
      });
  };
  return (
    <FormTemplate
      onSubmit={handleSubmit(onSubmit)}
      title="Create an intervention"
    >
      <InputWithLabel
        label="Title"
        placeholder="intervention title"
        {...register("title", { required: true, minLength: 3 })}
        error={errors.title?.type}
      />
      <TextAreaWithLabel
        label="Description"
        placeholder="intervention description"
        {...register("description")}
        error={errors.description?.type}
      />
    </FormTemplate>
  );
}
