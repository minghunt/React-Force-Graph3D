import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "@/components/Loading";
import Overview from "@/pages/Overview";

const BlankLayout = lazy(() => import("@/layouts/BlankLayout"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Introduction = lazy(() => import("@/pages/Introduction/index"));

const PublicRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route element={<BlankLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/introduction" element={<Introduction />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to={"/login"} replace={true} />}
                />
            </Routes>
        </Suspense>
    );
};

export default PublicRouter;
