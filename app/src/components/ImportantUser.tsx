"use client";

import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { getMostImportantUser } from "@/utils/analytics";
import { Separator } from "./ui/separator";

type Props = {
  screenName: string;
  popularity: number;
};

const ImportantUser = () => {
  const [data, setData] = useState<{
    username: string;
    favoriteScreen: string;
    leastfavoriteScreen: string;
  }>();

  useEffect(() => {
    const getData = async () => {
      const data: any = await getMostImportantUser();
      setData(data);
    };
    getData();
  }, []);

  return (
    <Card className="ring-1">
      <CardHeader>
        <CardTitle className="flex gap-1 items-center justify-between">
          {data?.username}
        </CardTitle>
        <Separator />
        <CardDescription>
          The Most important user and he loves to use{" "}
          <span className="underline italic font-bold text-primary">
            💘{data?.favoriteScreen}
          </span>{" "}
          but he did not like{" "}
          <span className="underline italic font-bold text-primary">
            😡{data?.leastfavoriteScreen}
          </span>
          .
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ImportantUser;
