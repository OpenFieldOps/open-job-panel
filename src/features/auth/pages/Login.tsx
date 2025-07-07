import { userAtom } from "@/atoms/userAtom";
import { apiClient, ok } from "@/lib/apiClient";
import { Button, Card, Field, Flex, Input } from "@chakra-ui/react";
import { AuthModel } from "backend/modules/auth/model";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = AuthModel.LoginUserBody;

export const Login = () => {
  const setUser = useSetAtom(userAtom);
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit = (data: Inputs) => {
    apiClient.auth.login.post(data).then((res) => {
      if (ok(res) && res.data) {
        setUser(res.data.user);
        navigate("/private/user/profile");
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
          <Card.Title>Sign In</Card.Title>
          <Card.Description>
            Login to your account and discover the best service app
          </Card.Description>
        </Card.Header>
        <Card.Body gap="2">
          <Field.Root>
            <Field.Label>E-Mail</Field.Label>
            <Input
              type="email"
              placeholder="Your E-Mail"
              {...register("email")}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              placeholder="Your Password"
              {...register("password")}
            />
          </Field.Root>
        </Card.Body>
        <Card.Footer>
          <Button type="submit" width="full">
            Create Account
          </Button>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};
