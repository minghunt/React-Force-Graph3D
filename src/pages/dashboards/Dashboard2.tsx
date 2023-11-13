import Chart from "@/components/Chart/Chart";
import TreeGrap from "@/components/Chart/TreeGrap";

const Dashboard2 = () => {
  return (
    <section className="flex-1 grid grid-rows-2 gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="glassmorphism">
          <Chart/>
        </div>
        <div className="glassmorphism">
          <TreeGrap/>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="glassmorphism"></div>
        <div className="glassmorphism"></div>
        <div className="glassmorphism"></div>
      </div>
    </section>
  );
};

export default Dashboard2;
