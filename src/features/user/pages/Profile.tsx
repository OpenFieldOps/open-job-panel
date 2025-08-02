import { Button, HStack } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { type UserAuth, userAtom, useUserAuth } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import PageContainer from "@/components/container/PageContainer";
import FileInput from "@/components/form/FileInput";
import InputWithLabel from "@/components/form/InputWithLabel";
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

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function Profile() {
  const { firstName, lastName, email } = useUserAuth();
  const { enabled: edit, toggle } = useEnabled(true);
  const { handleSubmit } = useForm<Inputs>({
    defaultValues: {
      firstName,
      lastName,
      email,
    },
  });
  const onSubmit = handleSubmit((data: Inputs) => {
    console.log(data);
  });

  return (
    <PageContainer card>
      <FormTemplate
        trigger={
          <>
            <Button variant={"outline"} onClick={toggle}>
              {edit ? "Edit" : "Cancel"}
            </Button>
            <Button type="submit">Save</Button>
          </>
        }
        onSubmit={onSubmit}
      >
        <ProfileAvatarHeader />
        <HStack gap={4}>
          <InputWithLabel
            label="First Name"
            defaultValue={firstName}
            disabled={edit}
          />
          <InputWithLabel
            label="Last Name"
            defaultValue={lastName}
            disabled={edit}
          />
        </HStack>
        <InputWithLabel label="Email" defaultValue={email} disabled={edit} />
      </FormTemplate>
    </PageContainer>
  );
}
