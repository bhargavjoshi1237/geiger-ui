import { ChartContainer, ChartLegendContent } from "@geiger/ui";
import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, Legend } from "recharts";

const data = [
  { week: "W1", active: 1240, churned: 180 },
  { week: "W2", active: 1380, churned: 210 },
  { week: "W3", active: 1510, churned: 165 },
  { week: "W4", active: 1620, churned: 190 },
  { week: "W5", active: 1780, churned: 205 },
  { week: "W6", active: 1930, churned: 175 },
];

const config = {
  active: { label: "Active users", color: "var(--chart-1)" },
  churned: { label: "Churned", color: "var(--chart-2)" },
};

export const BottomLegend = () => (
  <ChartContainer config={config} style={{ width: 520, height: 260 }}>
    <ResponsiveContainer width={520} height={260}>
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
        <Legend content={<ChartLegendContent />} />
        <Line dataKey="active" stroke="var(--color-active)" strokeWidth={2} dot={false} />
        <Line dataKey="churned" stroke="var(--color-churned)" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </ChartContainer>
);
