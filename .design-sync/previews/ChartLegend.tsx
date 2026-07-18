import { ChartContainer, ChartLegendContent } from "@geiger/ui";
import { Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, Legend } from "recharts";

const data = [
  { quarter: "Q1", direct: 320, referral: 210 },
  { quarter: "Q2", direct: 410, referral: 260 },
  { quarter: "Q3", direct: 385, referral: 240 },
  { quarter: "Q4", direct: 470, referral: 310 },
  { quarter: "Q5", direct: 520, referral: 360 },
];

const config = {
  direct: { label: "Direct", color: "var(--chart-1)" },
  referral: { label: "Referral", color: "var(--chart-2)" },
};

export const WithLegend = () => (
  <ChartContainer config={config} style={{ width: 520, height: 260 }}>
    <ResponsiveContainer width={520} height={260}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="quarter" tickLine={false} axisLine={false} tickMargin={8} />
        <Legend content={<ChartLegendContent />} />
        <Bar dataKey="direct" fill="var(--color-direct)" radius={4} />
        <Bar dataKey="referral" fill="var(--color-referral)" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);
