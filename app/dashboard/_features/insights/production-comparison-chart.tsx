"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { MonthlyRunData } from "../production-runs/_lib/data";

const chartConfig = {
  currentMonth: {
    label: "This Month",
    color: "var(--color-primary)",
  },
  lastMonth: {
    label: "Last Month",
    color: "var(--color-muted-foreground)",
  },
} satisfies ChartConfig;

export default function ProductionComparisonChart({
  data,
  currentLabel,
  lastLabel,
}: {
  data: MonthlyRunData[];
  currentLabel: string;
  lastLabel: string;
}) {
  const config = {
    currentMonth: { ...chartConfig.currentMonth, label: currentLabel },
    lastMonth: { ...chartConfig.lastMonth, label: lastLabel },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="min-h-[180px] sm:min-h-[250px] w-full">
      <LineChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(v) => `${v}`}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          allowDecimals={false}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) => `Day ${value}`}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="currentMonth"
          stroke="var(--color-currentMonth)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="lastMonth"
          stroke="var(--color-lastMonth)"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
