import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type UseMutationFormProps<T> = {
  mutationFn: (input: T) => Promise<void>;
};

export default function useMutationForm<T extends {}>({
  mutationFn,
}: UseMutationFormProps<T>) {
  const { handleSubmit, register, setValue, formState } = useForm<T>();

  const { mutate, isPending } = useMutation({
    mutationFn,
  });
  return {
    isPending,
    handleSubmit: handleSubmit((data: T) => mutate(data)),
    register,
    setValue,
    formState,
  };
}
