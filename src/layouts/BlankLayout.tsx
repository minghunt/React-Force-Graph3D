import { Outlet } from "react-router-dom";

const BlankLayout = () => {
  return (
    <div className="bg-image-login min-h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default BlankLayout;
