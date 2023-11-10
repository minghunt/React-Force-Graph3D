import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import PublicRouter from "./PublicRouter";
import ProtectedRouter from "./ProtectedRouter";
import Loading from "../components/Loading";

const AppRouter = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {isLoggedIn ? <Route path="*" element={<ProtectedRouter />} /> : <Route path="*" element={<PublicRouter />} />}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
