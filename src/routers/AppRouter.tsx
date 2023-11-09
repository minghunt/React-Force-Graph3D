import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import PublicRouter from "./PublicRouter";
import ProtectedRouter from "./ProtectedRouter";
import Loading from "../components/Loading";

const MainLayout = lazy(() => import("../layouts/MainLayout"));
const BlankLayout = lazy(() => import("../layouts/BlankLayout"));

const AppRouter = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {isLoggedIn ? (
          <Route element={<MainLayout />}>
            <Route path="*" element={<ProtectedRouter />} />
          </Route>
        ) : (
          <Route element={<BlankLayout />}>
            <Route path="*" element={<PublicRouter />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
