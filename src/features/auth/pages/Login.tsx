import { Button, Card, Flex } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom } from "@/atoms/userAtom";
import SeparatorWithTitle from "@/components/block/SeparatorWithTitle";
import { ButtonLink } from "@/components/buttons/Button";
import InputWithLabel from "@/components/form/InputWithLabel";
import { toaster } from "@/components/ui/contants";
import useMutationForm from "@/hooks/useMutationForm";
import { apiClient } from "@/lib/apiClient";

export function Login() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const { errorHandledRegister, handleSubmit } = useMutationForm({
    mutationFn: apiClient.auth.login.post,
    onApiSuccess(data) {
      setUser(data);
      toaster.success({
        title: "Login successful",
        description: "You are now logged in.",
      });
      navigate("/private/jobs");
    },
    onError: {
      401: () => {
        toaster.error({
          title: "Login failed",
          description: "Invalid email or password.",
        });
      },
      404: () => {
        toaster.error({
          title: "Login failed",
          description: "Invalid email or password.",
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
          <Card.Title>Sign In</Card.Title>
          <Card.Description>
            Login to your account and discover the best service app
          </Card.Description>
        </Card.Header>
        <Card.Body gap="2">
          <InputWithLabel
            label="Email"
            placeholder="Your Email"
            {...errorHandledRegister("email")}
          />

          <InputWithLabel
            label="Password"
            placeholder="Your Password"
            type="password"
            {...errorHandledRegister("password")}
          />
        </Card.Body>
        <Card.Footer flexDirection={"column"}>
          <Button type="submit" width="full">
            Sign In
          </Button>
          <SeparatorWithTitle title="or sign up" />
          <ButtonLink
            variant={"solid"}
            type="submit"
            width="full"
            to="/register"
          >
            Sign Up
          </ButtonLink>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
}
