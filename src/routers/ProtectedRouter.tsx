import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard1 from "../pages/dashboards/Dashboard1";
import Dashboard2 from "../pages/dashboards/Dashboard2";
import Dashboard3 from "../pages/dashboards/Dashboard3";
import Dashboard4 from "../pages/dashboards/Dashboard4";

const Home = lazy(() => import("../pages/Home"));

const ProtectedRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/dashboard_01" element={<Dashboard1 />} />
      <Route path="/dashboard_02" element={<Dashboard2 />} />
      <Route path="/dashboard_03" element={<Dashboard3 />} />
      <Route path="/dashboard_04" element={<Dashboard4 />} />
      <Route path="*" element={<Navigate to={"/"} replace={true} />} />
    </Routes>
  );
};

export default ProtectedRouter;
