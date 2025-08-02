import { Button, Card, Flex, HStack } from "@chakra-ui/react";
import type { AuthModel } from "backend/modules/auth/model";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userAtom } from "@/atoms/userAtom";
import SeparatorWithTitle from "@/components/block/SeparatorWithTitle";
import { ButtonLink } from "@/components/buttons/Button";
import InputWithLabel from "@/components/form/InputWithLabel";
import { apiClient, ok } from "@/lib/apiClient";

type Inputs = AuthModel.RegisterUserBody & {
  confirmPassword: string;
};

export default function Register() {
  const { register, handleSubmit } = useForm<Inputs>();
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const onSubmit = (data: Inputs) => {
    apiClient.auth.register.post(data).then((res) => {
      if (ok(res) && res.data) {
        setUser(res.data);
        navigate("/private/jobs");
      }
    });
  };

  return (
    <Flex justifyContent={"center"}>
      <Card.Root
        variant="elevated"
        boxShadow="lg"
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card.Header gap="1">
          <Card.Title>Sign Up</Card.Title>
          <Card.Description>
            Create an account and discover the best service app
          </Card.Description>
        </Card.Header>
        <Card.Body gap="2">
          <HStack>
            <InputWithLabel
              label="Firstname"
              placeholder="Your Firstname"
              {...register("firstName")}
            />
            <InputWithLabel
              label="Lastname"
              placeholder="Your Lastname"
              {...register("lastName")}
            />
          </HStack>
          <InputWithLabel
            label="Username"
            placeholder="Your Username"
            {...register("username")}
          />
          <InputWithLabel
            label="E-Mail"
            type="email"
            placeholder="Your E-Mail"
            {...register("email")}
          />
          <InputWithLabel
            label="Password"
            type="password"
            placeholder="Your Password"
            {...register("password", {})}
          />
          <InputWithLabel
            label="Confirm Password"
            type="password"
            placeholder="Confirm Your Password"
            {...register("confirmPassword")}
          />
        </Card.Body>
        <Card.Footer flexDirection={"column"}>
          <Button type="submit" width="full">
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
