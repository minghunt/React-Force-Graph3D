import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./children/custom-tooltip";
import { RoundedTopBarFill } from "./children/RoundedTopBar";

const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function SimpleBarChart({ className }: { className?: string }) {
    return (
        <div className="py-5 aspect-[1060/660] w-full h-full ">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    barSize={24}
                    margin={{
                        left: -10,
                    }}
                    className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis tickLine={false} dataKey="name" />
                    <YAxis tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                        dataKey="pv"
                        fill="#5a5fd7"
                        shape={<RoundedTopBarFill />}
                    />
                    <Bar
                        dataKey="uv"
                        fill="#10b981"
                        shape={<RoundedTopBarFill />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}