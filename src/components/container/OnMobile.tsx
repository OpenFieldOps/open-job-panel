import type { PropsWithChildren } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export function OnDesktop({ children }: PropsWithChildren) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return null;
	}
	return children;
}
