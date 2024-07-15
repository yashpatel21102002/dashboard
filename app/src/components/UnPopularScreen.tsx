"use client";

import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { getMostPopularScreens } from "@/utils/analytics";
import { TrendingDown } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  screenName: string;
  popularity: number;
};

const UnPopularScreen = ({ count }: { count: Props[] }) => {
  return (
    <Card className="ring-red-900 ring-1">
      <CardHeader>
        <CardTitle className="flex gap-1 items-center justify-between">
          {count[count.length - 1].screenName}{" "}
          <TrendingDown className="h-4 w-4" />
        </CardTitle>
        <Separator />{" "}
        <CardDescription>
          {count[count.length - 1].screenName} is visited for{" "}
          <span className="text-primary font-bold">
            {count[count.length - 1].popularity}
          </span>{" "}
          times from beginning of the IMS.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <span className="text-black bg-red-300 p-3 font-bold">
          Less Visited
        </span>
      </CardFooter>
    </Card>
  );
};

export default UnPopularScreen;
