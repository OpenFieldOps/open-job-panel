import { Button, Card, Flex } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom } from "@/atoms/userAtom";
import SeparatorWithTitle from "@/components/block/SeparatorWithTitle";
import { ButtonLink } from "@/components/buttons/Button";
import HorizontalFields from "@/components/form/HorizontalFields";
import InputWithLabel from "@/components/form/InputWithLabel";
import { toaster } from "@/components/ui/contants";
import useMutationForm from "@/hooks/useMutationForm";
import { apiClient } from "@/lib/apiClient";

export default function Register() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const { errorHandledRegister, handleSubmit, isPending } = useMutationForm({
    mutationFn: apiClient.auth.register.post,
    onApiSuccess(data) {
      setUser(data);
      toaster.success({
        title: "Registration successful",
        description: "You are now registered.",
      });
      navigate("/private/jobs");
    },
    onError: {
      409: () => {
        toaster.error({
          title: "Registration failed",
          description: "Username or email already exists.",
        });
      },
    },
  });

  return (
    <Flex justifyContent={"center"}>
      <Card.Root
        variant="elevated"
        boxShadow="lg"
        as={"form"}
        onSubmit={handleSubmit}
      >
        <Card.Header gap="1">
          <Card.Title>Sign Up</Card.Title>
          <Card.Description>
            Create an account and discover the best service app
          </Card.Description>
        </Card.Header>
        <Card.Body gap="2">
          <HorizontalFields>
            <InputWithLabel
              label="Firstname"
              placeholder="Your Firstname"
              {...errorHandledRegister("firstName")}
            />
            <InputWithLabel
              label="Lastname"
              placeholder="Your Lastname"
              {...errorHandledRegister("lastName")}
            />
          </HorizontalFields>
          <InputWithLabel
            label="Username"
            placeholder="Your Username"
            {...errorHandledRegister("username")}
          />
          <InputWithLabel
            label="E-Mail"
            type="email"
            placeholder="Your E-Mail"
            {...errorHandledRegister("email")}
          />
          <InputWithLabel
            label="Password"
            type="password"
            placeholder="Your Password"
            {...errorHandledRegister("password")}
          />
        </Card.Body>
        <Card.Footer flexDirection={"column"}>
          <Button type="submit" width="full" loading={isPending}>
            Create Account
          </Button>
          <SeparatorWithTitle title="or sign in" />
          <ButtonLink variant={"solid"} type="submit" width="full" to="/login">
            Sign In
          </ButtonLink>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
}
