import { ScrollArea, type ScrollAreaViewportProps } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

type Props = ScrollAreaViewportProps & PropsWithChildren;

export default function VerticalScrollArea({ children, ...props }: Props) {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport {...props}>{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
