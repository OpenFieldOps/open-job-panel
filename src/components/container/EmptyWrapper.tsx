import { ButtonGroup, EmptyState, VStack } from "@chakra-ui/react";

type ListWrapperProps<T> = {
  list?: T[] | null | undefined;
  render: (item: T, index: number) => React.ReactNode;
  children?: React.ReactNode;
};

export function ListWrapper<T>({
  list,
  render,
  children,
}: ListWrapperProps<T>) {
  if (Array.isArray(list) && list.length > 0) {
    return <>{list.map(render)}</>;
  }
  return <>{children}</>;
}

type EmptyWrapperProps<T> = {
  title: string;
  description: string;
} & ListWrapperProps<T>;

export function EmptyWrapperAction<T>({
  list,
  render,
  children,
  title,
  description,
}: EmptyWrapperProps<T>) {
  if (Array.isArray(list) && list.length > 0) {
    return <>{list.map(render)}</>;
  }
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>
        <ButtonGroup>{children}</ButtonGroup>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
