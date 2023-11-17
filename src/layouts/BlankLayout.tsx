import StarsCanvas from "@/components/StarBackground";
import { Outlet } from "react-router-dom";

const BlankLayout = () => {
  return (
    <div className="bg-image-main min-h-screen flex justify-center items-center overflow-x-hidden">
      <StarsCanvas />

      <Outlet />
    </div>
  );
};

export default BlankLayout;
