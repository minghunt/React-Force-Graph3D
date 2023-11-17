import SimpleBarChart from "@/components/Chart/SimpleBarChart";
import BubleChart from "@/components/Chart/BubleChart";
import CustomShapeBarChart from "@/components/Chart/CustomShapeBarChart";
import TreeGrap from "@/components/Chart/TreeGrap";
import Map from "@/components/Map/Map";
import StackedAreaChart from "@/components/Chart/StackedAreaChart";
import Index from "@/components/Radar/Index";

const Dashboard2 = () => {
  return (
    <section className="flex-1 grid grid-rows-2 gap-6 pb-10">
      <div className="grid grid-cols-2 gap-6">
        <div className="glassmorphism">
          <Map />
        </div>
        <div className="glassmorphism">
          <StackedAreaChart />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="glassmorphism">
          <BubleChart />
        </div>
        <div className="glassmorphism">
          <CustomShapeBarChart />
        </div>
        <div className="glassmorphism">
          <SimpleBarChart />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="glassmorphism">
          <TreeGrap />
        </div>
        <div className="glassmorphism ">
          <Index />
        </div>
        <div className="glassmorphism"></div>
      </div>
    </section>
  );
};

export default Dashboard2;
