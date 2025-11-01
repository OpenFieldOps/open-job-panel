import { Chart, useChart } from "@chakra-ui/charts";
import { EmptyState, For } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PeriodSelect, {
  PeriodSelectIds,
} from "@/components/buttons/PeriodSelect";
import RefreshButton from "@/components/buttons/RefreshButton";
import { DashboardBlock } from "@/features/dashboard/components/DashboardBlock";
import usePeriod from "@/hooks/usePeriod";
import { apiClient } from "@/lib/apiClient";
import { useMemo } from "react";

export default function DashboardIncomeStatistics() {
  const period = usePeriod(PeriodSelectIds.IncomeStatistics);

  const { data } = useQuery({
    queryKey: ["income-statistics", period.period],
    queryFn: async () =>
      await apiClient.job.income.get({
        query: {
          startDate: dayjs().subtract(period.period, "day").toISOString(),
          endDate: dayjs().toISOString(),
        },
      }),
    refetchOnMount: true,
  });

  const haveIncome = useMemo(
    () => data?.data?.some((item) => item.income > 0) ?? false,
    [data]
  );

  const chart = useChart({
    data:
      data?.data?.map((item) => ({
        day: dayjs(item.date).format("DD MMM"),
        income: item.income,
      })) || [],
    series: [{ name: "income", color: "teal.solid" }],
  });

  return (
    <DashboardBlock
      title="Income Statistics"
      toolbar={
        <>
          <PeriodSelect id={PeriodSelectIds.IncomeStatistics} />
          <RefreshButton queryKey={["income-statistics", period.period]} />
        </>
      }
    >
      {!haveIncome && (
        <EmptyState.Root>
          <EmptyState.Title>No income data available</EmptyState.Title>
          <EmptyState.Description>
            There is no income data for the selected period.
          </EmptyState.Description>
        </EmptyState.Root>
      )}
      {haveIncome && <IncomeChart chart={chart} />}
    </DashboardBlock>
  );
}

type IncomeChart = ReturnType<typeof useChart<{ day: string; income: number }>>;

function IncomeChart({ chart }: { chart: IncomeChart }) {
  return (
    <Chart.Root maxH="full" chart={chart}>
      <AreaChart
        data={chart.data}
        margin={{ left: -20, right: 1, top: 10, bottom: 5 }}
      >
        <CartesianGrid
          stroke={chart.color("border")}
          vertical={false}
          horizontal={false}
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey={chart.key("day")}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <YAxis
          stroke={chart.color("border")}
          domain={[0, "dataMax"]}
          allowDataOverflow={false}
        />

        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip />}
        />

        <For each={chart.series}>
          {(item) => (
            <defs key={item.name}>
              <Chart.Gradient
                id={`${item.name}-gradient`}
                stops={[
                  { offset: "0%", color: item.color, opacity: 0.3 },
                  { offset: "100%", color: item.color, opacity: 0.05 },
                ]}
              />
            </defs>
          )}
        </For>

        <For each={chart.series}>
          {(item) => (
            <Area
              key={item.name}
              type="monotone"
              dataKey={chart.key(item.name)}
              fill={`url(#${item.name}-gradient)`}
              stroke={chart.color(item.color)}
              strokeWidth={2}
              stackId="a"
            />
          )}
        </For>
      </AreaChart>
    </Chart.Root>
  );
}
