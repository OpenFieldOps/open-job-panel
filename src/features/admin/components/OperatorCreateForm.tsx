import { HStack } from "@chakra-ui/react";
import type { UserModel } from "backend/modules/user/model";
import { useForm } from "react-hook-form";
import { QueryCacheKey } from "@/app/queryClient";
import FormTemplate from "@/components/block/FormTemplate";
import InputWithLabel from "@/components/form/InputWithLabel";
import { apiClient, apiQueryCacheListAdd, ok } from "@/lib/apiClient";

const emailRegex = /^\S+@\S+\.\S+$/;

type Inputs = {
  username: string;
  email: string;
  lastName: string;
  firstName: string;
  password: string;
};

type OperatorCreateProps = {
  onCreated: () => void;
};

function useOperatorCreate({ onCreated }: OperatorCreateProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (body: Inputs) => {
    apiClient.user["create-user"].post(body).then((res) => {
      if (ok(res)) {
        apiQueryCacheListAdd(
          [QueryCacheKey.OperatorList],
          res.data as UserModel.UserInfo
        );
        onCreated();
      }
    });
  };

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
}

export default function OperatorCreateForm({ onCreated }: OperatorCreateProps) {
  const { register, errors, handleSubmit } = useOperatorCreate({ onCreated });

  return (
    <FormTemplate onSubmit={handleSubmit} title="Create Operator">
      <HStack gap={4} w={"full"}>
        <InputWithLabel
          label="First Name"
          placeholder="First Name"
          {...register("firstName", { required: true, minLength: 2 })}
          error={errors.firstName?.type}
        />
        <InputWithLabel
          label="Last Name"
          placeholder="Last Name"
          {...register("lastName", { required: true, minLength: 2 })}
          error={errors.lastName?.type}
        />
      </HStack>
      <InputWithLabel
        label="Email"
        type="email"
        {...register("email", { required: true, pattern: emailRegex })}
        error={errors.email?.type}
      />
      <InputWithLabel
        label="Username"
        placeholder="Username"
        {...register("username", { required: true, minLength: 3 })}
        error={errors.username?.type}
      />
      <InputWithLabel
        label="Password"
        placeholder="Password"
        type="password"
        {...register("password", { required: true, minLength: 6 })}
        error={errors.password?.type}
      />
    </FormTemplate>
  );
}
