import { ChartContainer, ChartLegendContent, ChartTooltipContent } from "@geiger/ui";
import { Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, Legend, Tooltip } from "recharts";

// ChartStyle is injected internally by ChartContainer — it emits the --color-<key>
// CSS variables from `config`, which these bars consume via fill="var(--color-...)".
const data = [
  { stage: "Lead", organic: 820, paid: 540 },
  { stage: "Trial", organic: 610, paid: 430 },
  { stage: "Active", organic: 470, paid: 350 },
  { stage: "Paid", organic: 320, paid: 260 },
  { stage: "Loyal", organic: 210, paid: 150 },
];

const config = {
  organic: { label: "Organic", color: "var(--chart-1)" },
  paid: { label: "Paid", color: "var(--chart-2)" },
};

export const InjectedColors = () => (
  <ChartContainer config={config} style={{ width: 520, height: 260 }}>
    <ResponsiveContainer width={520} height={260}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="stage" tickLine={false} axisLine={false} tickMargin={8} />
        <Tooltip defaultIndex={1} content={<ChartTooltipContent />} />
        <Legend content={<ChartLegendContent />} />
        <Bar dataKey="organic" fill="var(--color-organic)" radius={4} />
        <Bar dataKey="paid" fill="var(--color-paid)" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
);
