import { type ButtonProps, IconButton, Spinner } from "@chakra-ui/react";
import { useIsFetching } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { queryClient } from "@/app/queryClient";
import type { AppCacheKey } from "@/lib/apiClient";

type RefreshButtonProps = ButtonProps & {
  queryKey: AppCacheKey | [string, number];
};

export default function RefreshButton(props: RefreshButtonProps) {
  const isLoading =
    useIsFetching({
      queryKey: props.queryKey,
    }) > 0;
  console.log("isLoading", isLoading);
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
