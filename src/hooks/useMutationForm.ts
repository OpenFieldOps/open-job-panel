import { useMutation } from "@tanstack/react-query";
import { type DefaultValues, type Path, useForm } from "react-hook-form";
import { toaster } from "@/components/ui/contants";
import { ok } from "@/lib/apiClient";
import { formValidation, withDefaultRules } from "@/utils/form-validation";

interface ApiResponse<Data> {
  status: number;
  data: Data;
}

type NonNullable<T> = T extends null | undefined ? never : T;
// biome-ignore lint/suspicious/noConfusingVoidType: some function return void
type None = void | undefined | null;

type UseMutationFormProps<Inputs, Data, Res extends ApiResponse<Data>> = {
  mutationFn: (input: Inputs) => Promise<Res> | Res | None | Promise<None>;
  onApiSuccess?: (data: NonNullable<Res["data"]>) => void;
  defaultValues?: DefaultValues<Inputs>;
  onError?: {
    400?: () => void;
    401?: () => void;
    404?: () => void;
    409?: () => void;
  };
};

export default function useMutationForm<
  Inputs extends {},
  Data,
  Res extends ApiResponse<Data>
>({
  mutationFn,
  onApiSuccess,
  onError,
  defaultValues,
}: UseMutationFormProps<Inputs, Data, Res>) {
  const { handleSubmit, register, setValue, formState, reset, getValues } =
    useForm<Inputs>({
      defaultValues,
    });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Inputs) => {
      const res = await mutationFn(data);
      if (onApiSuccess && res && ok(res)) {
        onApiSuccess(res.data as NonNullable<Res["data"]>);
      } else if (res && !ok(res)) {
        const status = res.status;
        if (onError && status in onError) {
          onError[status as keyof typeof onError]?.();
        } else {
          toaster.error({
            title: "An error occurred",
            description: "Please try again later.",
          });
        }
      }
    },
  });

  const errorHandledRegister = (name: keyof Inputs) => {
    const defaultRules = withDefaultRules(
      register,
      name as string as Path<Inputs>
    );
    let required = false;
    if (name in formValidation) {
      if (typeof formValidation[name].required === "object") {
        required = formValidation[name].required.value;
      } else {
        required = !!formValidation[name].required;
      }
    }
    return {
      ...defaultRules,
      error: formState.errors[name]?.message || "",
      required,
    };
  };

  return {
    isPending,
    getAllValues: () => getValues(),
    handleSubmit: handleSubmit((data: Inputs) => mutate(data)),
    register,
    setValue,
    formState,
    reset,
    errorHandledRegister,
  };
}
