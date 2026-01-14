import { useEffect, useEffectEvent } from "react";
import { useLocation } from "react-router-dom";

export function useOnLocationChange(callback: () => void) {
	const location = useLocation();

	const onLocationChange = useEffectEvent(() => {
		callback();
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: this hook need to react only to location changes
	useEffect(() => {
		onLocationChange();
	}, [location.key]);
}
