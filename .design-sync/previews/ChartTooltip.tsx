import { ChartContainer, ChartTooltipContent } from "@geiger/ui";
import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, Tooltip } from "recharts";

const data = [
  { day: "Mon", visitors: 420, signups: 140 },
  { day: "Tue", visitors: 510, signups: 190 },
  { day: "Wed", visitors: 480, signups: 175 },
  { day: "Thu", visitors: 620, signups: 240 },
  { day: "Fri", visitors: 710, signups: 305 },
  { day: "Sat", visitors: 540, signups: 210 },
];

const config = {
  visitors: { label: "Visitors", color: "var(--chart-1)" },
  signups: { label: "Signups", color: "var(--chart-2)" },
};

export const WithTooltip = () => (
  <ChartContainer config={config} style={{ width: 520, height: 260 }}>
    <ResponsiveContainer width={520} height={260}>
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <Tooltip defaultIndex={3} content={<ChartTooltipContent />} />
        <Line dataKey="visitors" stroke="var(--color-visitors)" strokeWidth={2} dot={false} />
        <Line dataKey="signups" stroke="var(--color-signups)" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </ChartContainer>
);
