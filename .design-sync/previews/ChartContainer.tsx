import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@geiger/ui";
import { Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";

const data = [
  { month: "Jan", desktop: 186, mobile: 120 },
  { month: "Feb", desktop: 245, mobile: 168 },
  { month: "Mar", desktop: 214, mobile: 191 },
  { month: "Apr", desktop: 298, mobile: 230 },
  { month: "May", desktop: 276, mobile: 245 },
  { month: "Jun", desktop: 331, mobile: 289 },
];

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
};

// Nested numeric-size ResponsiveContainer keeps the chart's recharts copy in one
// context (the static bundle ships a second recharts copy inside ChartContainer).
export const BarChartCard = () => (
  <ChartContainer config={config} style={{ width: 520, height: 260 }}>
    <ResponsiveContainer width={520} height={260}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <Tooltip defaultIndex={3} content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);
