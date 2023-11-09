import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="bg-image-custom min-h-screen flex flex-col p-4 gap-4">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
