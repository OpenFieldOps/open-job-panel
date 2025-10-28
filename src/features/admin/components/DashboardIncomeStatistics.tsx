import { DashboardBlock } from "@/features/dashboard/components/DashboardBlock";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardIncomeStatistics() {
  const chart = useChart({
    data: [
      { windows: 186, month: "January" },
      { windows: 165, month: "February" },
      { windows: 190, month: "March" },
      { windows: 195, month: "May" },
      { windows: 182, month: "June" },
      { windows: 175, month: "August" },
      { windows: 180, month: "October" },
      { windows: 185, month: "November" },
    ],
    series: [{ name: "windows", color: "teal.solid" }],
  });

  return (
    <DashboardBlock title="Income Statistics">
      <Chart.Root maxH="full" chart={chart}>
        <AreaChart
          data={chart.data}
          margin={{ left: -25, right: 1, top: 10, bottom: 5 }}
        >
          <CartesianGrid
            stroke={chart.color("border")}
            vertical={false}
            horizontal={false}
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey={chart.key("month")}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `${value.slice(0, 3)} `}
          />

          <YAxis stroke={chart.color("border")} />

          <Tooltip
            cursor={false}
            animationDuration={100}
            content={<Chart.Tooltip />}
          />

          {chart.series.map((item) => (
            <defs key={item.name}>
              <Chart.Gradient
                id={`${item.name}-gradient`}
                stops={[
                  { offset: "0%", color: item.color, opacity: 0.3 },
                  { offset: "100%", color: item.color, opacity: 0.05 },
                ]}
              />
            </defs>
          ))}

          {chart.series.map((item) => (
            <Area
              key={item.name}
              type="natural"
              dataKey={chart.key(item.name)}
              fill={`url(#${item.name}-gradient)`}
              stroke={chart.color(item.color)}
              strokeWidth={2}
              stackId="a"
            />
          ))}
        </AreaChart>
      </Chart.Root>
    </DashboardBlock>
  );
}
