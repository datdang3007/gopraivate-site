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

type ActivityRecord = {
  activity_date: string;
  chat_count?: number;
  tokens_used?: number;
  active_users?: number;
};

type TimeBasedMetricsProps = {
  records?: ActivityRecord[];
  metric?: "tokens_used" | "chat_count" | "active_users";
};

const FALLBACK_ACTIVITY_DATA: ActivityRecord[] = [];

const METRIC_LABEL: Record<Required<TimeBasedMetricsProps>["metric"], string> =
  {
    tokens_used: "Token Usage",
    chat_count: "Chat Count",
    active_users: "Active Users",
  };

export const TimeBasedMetrics: React.FC<TimeBasedMetricsProps> = ({
  records,
  metric = "tokens_used",
}) => {
  const [timeRange, setTimeRange] = useState<"7" | "30">("7");

  const chartData = useMemo(() => {
    const source =
      records && records.length > 0 ? records : FALLBACK_ACTIVITY_DATA;
    const sorted = [...source].sort(
      (a, b) =>
        new Date(a.activity_date).getTime() -
        new Date(b.activity_date).getTime(),
    );

    const limit = timeRange === "7" ? 7 : 30;
    const windowed = sorted.slice(-limit);

    return windowed.map((item) => {
      const date = new Date(item.activity_date);
      const label =
        timeRange === "7"
          ? date.toLocaleDateString("en-US", { weekday: "short" })
          : date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

      const value =
        metric === "chat_count"
          ? (item.chat_count ?? 0)
          : metric === "active_users"
            ? (item.active_users ?? 0)
            : (item.tokens_used ?? 0);

      return { day: label, value };
    });
  }, [records, metric, timeRange]);

  const chartConfig = useMemo(
    () => ({
      value: {
        label: METRIC_LABEL[metric],
        color: "#3b82f6",
      },
    }),
    [metric],
  );

  const title = `${METRIC_LABEL[metric]} (Last ${timeRange} Days)`;

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
                dataKey="value"
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
