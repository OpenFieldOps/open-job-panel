import { HStack } from "@chakra-ui/react";
import type { UserModel } from "backend/modules/user/UserModel";
import { QueryCacheKey } from "@/app/queryClient";
import FormTemplate from "@/components/block/FormTemplate";
import InputWithLabel from "@/components/form/InputWithLabel";
import { toaster } from "@/components/ui/contants";
import useMutationForm from "@/hooks/useMutationForm";
import {
  type AppCacheKey,
  apiClient,
  apiQueryCacheListAdd,
} from "@/lib/apiClient";

type UserCreateProps = {
  onCreated: () => void;
  role: UserModel.AssignedUserRole;
};

const roleCacheKeyMap: Record<UserModel.AssignedUserRole, AppCacheKey> = {
  operator: [QueryCacheKey.OperatorList],
  client: [QueryCacheKey.ClientList],
  supervisor: [QueryCacheKey.SupervisorList],
};

export default function UserCreateForm({ onCreated, role }: UserCreateProps) {
  const { errorHandledRegister, handleSubmit, isPending } = useMutationForm({
    mutationFn: apiClient.user["create-user"].post,
    onApiSuccess(data) {
      apiQueryCacheListAdd(roleCacheKeyMap[role], data);
      toaster.success({ title: "User created successfully" });
      onCreated();
    },
    defaultValues: {
      role,
    },
  });

  return (
    <FormTemplate
      isLoading={isPending}
      onSubmit={handleSubmit}
      title={`Create ${role}`}
    >
      <HStack gap={4} w={"full"}>
        <InputWithLabel
          label="First Name"
          placeholder="First Name"
          autoComplete="given-name"
          {...errorHandledRegister("firstName")}
        />
        <InputWithLabel
          label="Last Name"
          placeholder="Last Name"
          autoComplete="family-name"
          {...errorHandledRegister("lastName")}
        />
      </HStack>
      <InputWithLabel
        label="Email"
        type="email"
        placeholder="email"
        autoComplete="email"
        {...errorHandledRegister("email")}
      />
      <InputWithLabel
        label="Phone Number"
        type="tel"
        placeholder="phone number"
        autoComplete="tel"
        {...errorHandledRegister("phone")}
      />
      <InputWithLabel
        label="Username"
        placeholder="Username"
        autoComplete="username"
        {...errorHandledRegister("username")}
      />
      <InputWithLabel
        label="Password"
        placeholder="Password"
        type="password"
        autoComplete="new-password"
        {...errorHandledRegister("password")}
      />
    </FormTemplate>
  );
}
