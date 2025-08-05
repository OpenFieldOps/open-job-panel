import { useTransition } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  search: string;
};

type UseSearchTransitionProps = {
  filter: (value: string) => void;
};

export default function useSearchTransition({
  filter,
}: UseSearchTransitionProps) {
  const { register } = useForm<Inputs>();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    const valueLowerCase = value.toLocaleLowerCase();
    startTransition(() => {
      filter(valueLowerCase);
    });
  };

  return {
    inputProps: register("search", {
      onChange: (e) => handleSearch(e.target.value),
    }),
    startTransition,
    isPending,
  };
}
