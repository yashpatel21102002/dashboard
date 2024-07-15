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
import { TrendingUp } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  screenName: string;
  popularity: number;
};

const PopularScreen = ({ count }: { count: Props[] }) => {
  return (
    <Card className="ring-1 ring-green-900">
      <CardHeader>
        <CardTitle className="flex gap-1 items-center justify-between">
          {count[0]?.screenName} <TrendingUp className="h-4 w-4" />
        </CardTitle>
        <Separator />

        <CardDescription>
          {count[0]?.screenName} is visited for{" "}
          <span className="text-primary font-bold">{count[0]?.popularity}</span>{" "}
          times from beginning of the IMS.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <span className="text-black bg-green-300 p-3 font-bold">
          Most Visited
        </span>
      </CardFooter>
    </Card>
  );
};

export default PopularScreen;
