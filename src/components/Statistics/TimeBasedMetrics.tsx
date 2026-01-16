import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Mock data for 7 days
const data7Days = [
  { day: "Mon", tokens: 1250 },
  { day: "Tue", tokens: 2100 },
  { day: "Wed", tokens: 1800 },
  { day: "Thu", tokens: 2400 },
  { day: "Fri", tokens: 2200 },
  { day: "Sat", tokens: 800 },
  { day: "Sun", tokens: 750 },
];

// Mock data for 30 days (last 30 days, showing weekly averages)
const data30Days = [
  { day: "Week 1", tokens: 1500 },
  { day: "Week 2", tokens: 1800 },
  { day: "Week 3", tokens: 2100 },
  { day: "Week 4", tokens: 1950 },
];

const chartConfig = {
  tokens: {
    label: "Token Usage",
    color: "#3b82f6", // Blue color matching the image
  },
};

export const TimeBasedMetrics = () => {
  const [timeRange, setTimeRange] = useState<"7" | "30">("7");

  const chartData = useMemo(() => {
    return timeRange === "7" ? data7Days : data30Days;
  }, [timeRange]);

  const title = `Token Usage (Last ${timeRange} Days)`;

  return (
    <Card className="w-full shadow-sm border-border transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
        <Select
          value={timeRange}
          onValueChange={(value: "7" | "30") => setTimeRange(value)}
        >
          <SelectTrigger className="w-[140px] cursor-pointer transition-all duration-200 hover:border-primary/50">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7" className="cursor-pointer">
              Last 7 days
            </SelectItem>
            <SelectItem value="30" className="cursor-pointer">
              Last 30 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 15, left: 5, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="day"
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 12,
                }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 12,
                }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: "hsl(var(--primary) / 0.1)" }}
              />
              <Bar
                dataKey="tokens"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                className="transition-all duration-300 hover:opacity-80"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
