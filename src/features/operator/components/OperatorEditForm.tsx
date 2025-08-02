import { useDialog } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import FormTemplate from "@/components/block/FormTemplate";
import { TriggeredDialog } from "@/components/dialog/ButtonDialog";
import InputWithLabel from "@/components/form/InputWithLabel";
import { apiClient } from "@/lib/apiClient";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

function OperatorEditForm() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit = handleSubmit((data: Inputs) => {
    apiClient.user.patch({
      firstName: data.firstName,
      lastName: data.lastName,
    });
  });
  return (
    <FormTemplate title="Edit Operator" confirmText="Save" onSubmit={onSubmit}>
      <InputWithLabel
        label="First Name"
        placeholder="First Name"
        autoComplete="given-name"
        {...register("firstName", { required: true, minLength: 2 })}
      />
      <InputWithLabel
        label="Last Name"
        placeholder="Last Name"
        autoComplete="family-name"
        {...register("lastName", { required: true, minLength: 2 })}
      />
      <InputWithLabel
        label="Email"
        type="email"
        placeholder="operator email"
        autoComplete="email"
        {...register("email", { required: true })}
      />
      <InputWithLabel
        label="Username"
        placeholder="Username"
        autoComplete="username"
        {...register("username", { required: true, minLength: 3 })}
      />
    </FormTemplate>
  );
}

export function OperatorEditDialogTrigger({ children }: PropsWithChildren) {
  const dialogState = useDialog();
  return (
    <TriggeredDialog dialogState={dialogState} trigger={children}>
      <OperatorEditForm />
    </TriggeredDialog>
  );
}
