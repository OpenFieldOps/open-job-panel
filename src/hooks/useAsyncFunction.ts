import { useState } from "react";

export function useAsyncFunction<Args extends unknown[]>(
	func: (...args: Args) => Promise<void>,
) {
	const [loading, setLoading] = useState(false);

	const wrappedFunction = async (...args: Args) => {
		setLoading(true);
		try {
			await func(...args);
		} finally {
			setLoading(false);
		}
	};

	return [wrappedFunction, loading] as const;
}
