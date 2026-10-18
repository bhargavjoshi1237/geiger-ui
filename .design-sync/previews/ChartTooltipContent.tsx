import { ChartContainer, ChartTooltipContent } from "@geiger/ui";
import { Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, Tooltip } from "recharts";

const data = [
  { month: "Jan", revenue: 124, refunds: 18 },
  { month: "Feb", revenue: 152, refunds: 21 },
  { month: "Mar", revenue: 141, refunds: 16 },
  { month: "Apr", revenue: 189, refunds: 24 },
  { month: "May", revenue: 213, refunds: 20 },
  { month: "Jun", revenue: 248, refunds: 26 },
];

const config = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  refunds: { label: "Refunds", color: "var(--chart-2)" },
};

export const DotIndicator = () => (
  <ChartContainer config={config} style={{ width: 520, height: 260 }}>
    <ResponsiveContainer width={520} height={260}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <Tooltip defaultIndex={4} content={<ChartTooltipContent indicator="dot" />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} isAnimationActive={false} />
        <Bar dataKey="refunds" fill="var(--color-refunds)" radius={4} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);

export const LineIndicator = () => (
  <ChartContainer config={config} style={{ width: 520, height: 260 }}>
    <ResponsiveContainer width={520} height={260}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <Tooltip defaultIndex={2} content={<ChartTooltipContent indicator="line" />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} isAnimationActive={false} />
        <Bar dataKey="refunds" fill="var(--color-refunds)" radius={4} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);
