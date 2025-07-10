import { QueryCacheKey } from "@/app/queryClient";
import { useUserId } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import InputWithLabel from "@/components/form/InputWithLabel";
import TextAreaWithLabel from "@/components/form/TextAreaWithLabel";
import { apiClient, apiQueryCacheUpdate, ok } from "@/lib/apiClient";
import type { InterventionModel } from "backend/modules/intervention/model";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = ({ title, description }: Inputs) => {
    apiClient.intervention
      .post({
        title,
        description,
        assignedTo: userId,
      })
      .then((res) => {
        if (ok(res) && res.data) {
          apiQueryCacheUpdate(
            QueryCacheKey.InterventionList,
            (oldData: InterventionModel.InterventionList) => [
              ...oldData,
              res.data,
            ]
          );
          console.log("Intervention created", res.data);
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
        {...register("title")}
      />
      <TextAreaWithLabel
        label="Description"
        placeholder="intervention description"
        {...register("description")}
      />
    </FormTemplate>
  );
}
