import BubleChart from "@/components/Chart/BubleChart";
import TreeGrap from "@/components/Chart/TreeGrap";
import Map from "@/components/Map/Map";

const Dashboard2 = () => {
    return (
        <section className="flex-1 grid grid-rows-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="glassmorphism">
                    <Map />
                </div>
                <div className="glassmorphism">
                    <TreeGrap />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="glassmorphism">
                    <BubleChart />
                </div>
                <div className="glassmorphism"></div>
                <div className="glassmorphism"></div>
            </div>
        </section>
    );
};

export default Dashboard2;
