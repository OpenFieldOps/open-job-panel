import { useState } from "react";

export default function useEnabled(defaultValue?: boolean) {
	const [enabled, setEnabled] = useState(!!defaultValue);
	return {
		enabled,
		toggle: () => setEnabled(!enabled),
		setEnabled,
	};
}
