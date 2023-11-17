import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "@/components/Loading";
import SidebarLayout from "@/layouts/SidebarLayout";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const Home = lazy(() => import("@/pages/Home"));
const Dashboard1 = lazy(() => import("@/pages/Dashboards/Dashboard1"));
const Dashboard2 = lazy(() => import("@/pages/Dashboards/Dashboard2"));
const Dashboard3 = lazy(() => import("@/pages/Dashboards/Dashboard3"));
const Dashboard4 = lazy(() => import("@/pages/Dashboards/Dashboard4"));

const ProtectedRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/dashboard_01" element={<Dashboard1 />} />
                    <Route path="/dashboard_02" element={<Dashboard2 />} />
                    <Route path="/dashboard_03" element={<Dashboard3 />} />
                    <Route path="/dashboard_04" element={<Dashboard4 />} />
                </Route>

                <Route element={<SidebarLayout />}>
                    <Route path="/sidebar" />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to={"/"} replace={true} />}
                />
            </Routes>
        </Suspense>
    );
};

export default ProtectedRouter;
