import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import useFetch from "@/hooks/useFetch";
import { REQUEST_TYPE } from "@/utils/types";
import StarsCanvas from "@/components/StarBackground";

const MainLayout = () => {
    const { isLoading, sendRequest } = useFetch();

    useEffect(() => {
        if (isLoading) return;
        sendRequest({ type: REQUEST_TYPE.USER });
    }, []);

    return (
        <div className="bg-image-main min-h-screen flex flex-col p-4 gap-4">
            <StarsCanvas />
            <Header />
            <Outlet />
        </div>
    );
};

export default MainLayout;
