import type React from "react";
import ErrorInfo from "../block/ErrorInfo";
import { Spinner } from "@chakra-ui/react";

type OptionalArrayWrapperProps<T> = {
  data?: T[] | null | undefined;
  render: (value: T) => React.ReactNode;
  error?: Error | null | undefined;
};

export default function OptionalArrayWrapper<T>({
  render,
  data,
  error,
}: OptionalArrayWrapperProps<T>) {
  if (error) return <ErrorInfo />;
  if (!data) return <Spinner />;
  return data.map(render);
}
