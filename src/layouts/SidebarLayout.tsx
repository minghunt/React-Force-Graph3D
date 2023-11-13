import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StarsCanvas from "@/components/StarBackground";

const SidebarLayout = () => {
    return (
        <div className="bg-image-main flex gap-4">
            <StarsCanvas />
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default SidebarLayout;
