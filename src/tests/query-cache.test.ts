import { describe, expect, it } from "bun:test";
import { QueryCacheKey, queryClient } from "@/app/queryClient";
import {
	type AppCacheKey,
	apiQueryCacheListAdd,
	apiQueryCacheListDelete,
	apiQueryCacheListUpdate,
	apiQueryCacheSingleUpdateList,
} from "@/lib/apiClient";
import type { ApiSucessResponse } from "@/types/api";

type FakeData = {
	id: number;
	name: string;
};

function getCacheValue<T>(key: AppCacheKey): T | undefined {
	return queryClient.getQueryData(key) as T | undefined;
}

describe("API Client Tests", () => {
	it("should update a query cache list", () => {
		queryClient.setQueryData([QueryCacheKey.JobList], {
			data: [
				{ id: 1, name: "Job 1" },
				{ id: 2, name: "Job 2" },
			],
		});

		apiQueryCacheListUpdate<FakeData[]>([QueryCacheKey.JobList], (oldData) => {
			return oldData.map((item) => ({
				...item,
				name: `${item.name} Updated`,
			}));
		});

		const updatedData = getCacheValue<ApiSucessResponse<FakeData[]>>([
			QueryCacheKey.JobList,
		]);

		expect(updatedData).toBeDefined();

		if (!updatedData) {
			throw new Error("Updated data is undefined");
		}

		expect(updatedData?.data).toHaveLength(2);
		expect(updatedData?.data[0].name).toBe("Job 1 Updated");
		expect(updatedData?.data[1].name).toBe("Job 2 Updated");
	});

	it("should add a new item to the query cache list", () => {
		queryClient.setQueryData([QueryCacheKey.JobList], {
			data: [
				{ id: 1, name: "Job 1" },
				{ id: 2, name: "Job 2" },
			],
		});

		apiQueryCacheListAdd<FakeData>([QueryCacheKey.JobList], {
			id: 3,
			name: "Job 3",
		});

		const updatedData = getCacheValue<ApiSucessResponse<FakeData[]>>([
			QueryCacheKey.JobList,
		]);
		expect(updatedData).toBeDefined();
		if (!updatedData) {
			throw new Error("Updated data is undefined");
		}
		expect(updatedData?.data).toHaveLength(3);
		expect(updatedData?.data[2].name).toBe("Job 3");
	});

	it("should update a single item in the query cache", () => {
		queryClient.setQueryData([QueryCacheKey.JobList], {
			data: [
				{ id: 1, name: "Job 1" },
				{ id: 2, name: "Job 2" },
			],
		});

		apiQueryCacheSingleUpdateList<FakeData>(
			[QueryCacheKey.JobList],
			1,
			(oldData) => {
				if (!oldData) {
					throw new Error("Old data is undefined");
				}
				return { ...oldData, name: "Job 1 Updated" };
			},
		);

		const updatedData = getCacheValue<ApiSucessResponse<FakeData[]>>([
			QueryCacheKey.JobList,
		]);
		expect(updatedData).toBeDefined();
		if (!updatedData) {
			throw new Error("Updated data is undefined");
		}
		expect(updatedData?.data).toHaveLength(2);
		expect(updatedData?.data[0].name).toBe("Job 1 Updated");
		expect(updatedData?.data[1].name).toBe("Job 2");
	});

	it("should delete an item from the query cache list", () => {
		queryClient.setQueryData([QueryCacheKey.JobList], {
			data: [
				{ id: 1, name: "Job 1" },
				{ id: 2, name: "Job 2" },
			],
		});

		apiQueryCacheListDelete<FakeData>([QueryCacheKey.JobList], 1);

		const updatedData = getCacheValue<ApiSucessResponse<FakeData[]>>([
			QueryCacheKey.JobList,
		]);
		expect(updatedData).toBeDefined();
		if (!updatedData) {
			throw new Error("Updated data is undefined");
		}
		expect(updatedData?.data).toHaveLength(1);
		expect(updatedData?.data[0].id).toBe(2);
	});
});
