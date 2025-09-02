import { Button } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { type UserAuth, userAtom, useUserAuth } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import PageContainer from "@/components/container/PageContainer";
import FileInput from "@/components/form/FileInput";
import HorizontalFields from "@/components/form/HorizontalFields";
import InputWithLabel from "@/components/form/InputWithLabel";
import { toaster } from "@/components/ui/contants";
import useMutationForm from "@/hooks/useMutationForm";
import useEnabled from "@/hooks/useToggle";
import { apiClient } from "@/lib/apiClient";
import { CurrentUserAvatar } from "../components/UserAvatar";

function ProfileAvatarHeader() {
  const setUser = useSetAtom(userAtom);
  const onUploadAvatar = (file: File) => {
    apiClient.user.avatar
      .patch({
        file,
      })
      .then((res) => {
        if (res.data) {
          setUser((prev) => {
            const old = prev as UserAuth;
            return {
              ...old,
              user: {
                ...old.user,
                avatar: res.data,
              },
            };
          });
        }
      });
  };
  return (
    <>
      <CurrentUserAvatar size={"xl"} />
      <FileInput onUpload={onUploadAvatar} />
    </>
  );
}

export default function Profile() {
  const { firstName, lastName, phone } = useUserAuth();
  const { enabled: edit, toggle } = useEnabled(true);
  const setUser = useSetAtom(userAtom);

  const { handleSubmit, errorHandledRegister, getAllValues, isPending } =
    useMutationForm({
      mutationFn: apiClient.user.patch,
      onApiSuccess() {
        const values = getAllValues();
        toaster.success({
          title: "Profile updated successfully",
        });
        setUser((prev) => {
          const old = prev as UserAuth;
          return {
            ...old,
            user: {
              ...old.user,
              firstName: values.firstName,
              lastName: values.lastName,
              phone: values.phone,
            },
          };
        });
        toggle();
      },
      onError: {
        409: () => {
          toaster.error({
            title: "Email already exists",
            description: "Please use a different email address.",
          });
        },
        400: () => {
          toaster.error({
            title: "Invalid input",
            description: "Please check your input and try again.",
          });
        },
      },
    });

  return (
    <PageContainer card>
      <FormTemplate
        isLoading={isPending}
        trigger={
          <>
            <Button variant={"outline"} onClick={toggle}>
              {edit ? "Edit" : "Cancel"}
            </Button>
            <Button type="submit">Save</Button>
          </>
        }
        onSubmit={handleSubmit}
      >
        <ProfileAvatarHeader />
        <HorizontalFields>
          <InputWithLabel
            label="First Name"
            defaultValue={firstName}
            disabled={edit}
            {...errorHandledRegister("firstName")}
          />
          <InputWithLabel
            label="Last Name"
            defaultValue={lastName}
            disabled={edit}
            {...errorHandledRegister("lastName")}
          />
        </HorizontalFields>
        <InputWithLabel
          label="Phone"
          defaultValue={phone}
          disabled={edit}
          {...errorHandledRegister("phone")}
        />
      </FormTemplate>
    </PageContainer>
  );
}
