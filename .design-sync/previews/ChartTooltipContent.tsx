import { ChartContainer, ChartTooltipContent } from "@geiger/ui";
import { Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, Tooltip } from "recharts";

const data = [
  { month: "Jan", revenue: 12400, refunds: 1800 },
  { month: "Feb", revenue: 15200, refunds: 2100 },
  { month: "Mar", revenue: 14100, refunds: 1600 },
  { month: "Apr", revenue: 18900, refunds: 2400 },
  { month: "May", revenue: 21300, refunds: 2050 },
  { month: "Jun", revenue: 24800, refunds: 2600 },
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
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar dataKey="refunds" fill="var(--color-refunds)" radius={4} />
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
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar dataKey="refunds" fill="var(--color-refunds)" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);
