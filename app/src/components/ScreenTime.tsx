"use client";

import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader } from "./ui/card";

const ScreenTime = () => {
  const [data, setData] = useState<
    { screenName: string; totalScreenTime: number }[]
  >([]);
  useEffect(() => {
    const getScreenTime = async () => {
      const data: any = await getScreenTime();
      setData(data);
    };
    getScreenTime();
  }, []);
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
