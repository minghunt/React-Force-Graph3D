import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Navigate to={"/login"} replace={true} />} />
    </Routes>
  );
};

export default PublicRouter;