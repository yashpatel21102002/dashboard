import ImportantUser from "@/components/ImportantUser";
import PopularScreen from "@/components/PopularScreen";
import ScreenTime from "@/components/ScreenTime";
import UnPopularScreen from "@/components/UnPopularScreen";
import YearlyCommonUsage from "@/components/YearlyCommonUsage";
import { getMostPopularScreens } from "@/utils/analytics";

const Page = async () => {
  const count = await getMostPopularScreens();

  return (
    <div className="flex flex-col gap-4 mt-4 mx-2">
      <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 gap-2">
        <PopularScreen count={count} />
        <UnPopularScreen count={count} />
        <ScreenTime />
        <ImportantUser />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center">
        <YearlyCommonUsage />
      </div>
    </div>
  );
};

export default Page;
