"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getVisitByMonth } from "@/utils/analytics";
import { useEffect, useState } from "react";

const chartConfig = {
  desktop: {
    label: "visitCount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type totalVisitors = {
  month: string;
  visitCount: number;
};

export default function YearlyCommonUsage() {
  const [chartData, setChartData] = useState<totalVisitors[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const now = new Date();
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDay()
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVisitByMonth();
      setChartData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateVisits = () => {
      let visits = 0;
      chartData.map((item) => {
        visits = visits + item.visitCount;
      });
      setTotalVisits(visits);
    };

    calculateVisits();
  }, [chartData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>IMS Visit Chart</CardTitle>
        <CardDescription>
          {oneYearAgo.toLocaleString("default", { month: "long" })}{" "}
          {oneYearAgo.getFullYear()} {" - "}{" "}
          {now.toLocaleString("default", { month: "long" })} {now.getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitCount"
              fill="var(--color-desktop)"
              radius={8}
              barSize={10}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Hurray! total {totalVisits} visits recorded!
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
