import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const SidebarLayout = () => {
  return (
    <div className="bg-image-custom flex gap-4">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default SidebarLayout;
