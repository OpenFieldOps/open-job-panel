import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

type UseSimpleVirtualizerProps<T> = {
  list: T[];
  size: number;
  render: (el: T) => React.ReactNode;
};

export default function useSimpleVirtualizer<T>({
  list,
  size,
  render,
}: UseSimpleVirtualizerProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: list.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => size,
  });

  return {
    rowVirtualizer,
    parentRef,
    List: () => (
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
          width: "100%",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const el = list[virtualRow.index];
          return (
            <div
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {render(el)}
            </div>
          );
        })}
      </div>
    ),
  };
}
