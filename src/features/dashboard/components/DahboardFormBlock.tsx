import type { PropsWithChildren } from "react";
import { DashboardBlock } from "./DashboardBlock";

type DashboardFormBlockProps = {
  title: string;
} & PropsWithChildren;
export default function DashboardFormBlock({
  title,
  children,
}: DashboardFormBlockProps) {
  return (
    <DashboardBlock gap={4} p={4} title={title}>
      {children}
    </DashboardBlock>
  );
}
