import {
  Button,
  Card,
  Field,
  Flex,
  HStack,
  Input,
  Separator,
  Text,
} from "@chakra-ui/react";
import { AuthModel } from "backend/modules/auth/model";
import { useForm } from "react-hook-form";

type Inputs = AuthModel.RegisterUserBody;

export default function Register() {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = () => {};

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
          <HStack gap="2">
            <Separator flex="1" />
            <Text color="fg.subtle" textStyle="sm" whiteSpace="nowrap">
              or sign up with
            </Text>
            <Separator flex="1" />
          </HStack>
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
}
