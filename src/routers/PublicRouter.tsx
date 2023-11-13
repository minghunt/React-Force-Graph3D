import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "@/components/Loading";

const BlankLayout = lazy(() => import("@/layouts/BlankLayout"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

const PublicRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<BlankLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<Navigate to={"/login"} replace={true} />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRouter;
