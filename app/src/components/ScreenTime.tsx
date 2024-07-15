import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp } from "lucide-react";
import { getScreenTime } from "@/utils/analytics";

const ScreenTime = async () => {
  const data = await getScreenTime();
  return (
    <Card className="ring-1">
      <CardHeader>
        <CardDescription>
          {data[0].screenName} has most screen time of{" "}
          <span className="text-primary font-bold">
            {data[0].totalScreenTime} Hour
          </span>{" "}
          and {data[data.length - 1].screenName} has least screen time of{" "}
          <span className="text-primary font-bold">
            {data[data.length - 1].totalScreenTime} Hour
          </span>{" "}
          from beginning of the IMS.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ScreenTime;
