import { type ButtonProps, IconButton, Spinner } from "@chakra-ui/react";
import { RefreshCcw } from "lucide-react";
import { queryClient } from "@/app/queryClient";
import useIsLoading from "@/hooks/useIsLoading";
import type { AppCacheKey } from "@/lib/apiClient";

type RefreshButtonProps = ButtonProps & {
  queryKey: AppCacheKey;
};

export default function RefreshButton(props: RefreshButtonProps) {
  const isLoading = useIsLoading(props.queryKey);
  const disabled = props.disabled || isLoading;
  return (
    <IconButton
      disabled={disabled}
      onClick={() =>
        queryClient.invalidateQueries({
          queryKey: props.queryKey,
        })
      }
      variant={"outline"}
      {...props}
    >
      {isLoading ? <Spinner /> : <RefreshCcw />}
    </IconButton>
  );
}
