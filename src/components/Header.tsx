import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/store/slices/auth";
import {
    LuUserCircle2,
    LuBell,
    LuXCircle,
    LuMenu,
    LuHome,
    LuLayoutDashboard,
    LuFileSpreadsheet,
    LuLayoutList,
    LuSettings,
    LuPalette,
    LuLogOut,
    LuMail,
    LuSettings2,
    LuBellRing,
    LuUser2,
    LuPanelRightClose,
} from "react-icons/lu";
import { useAppSelector } from "@/hooks/useAppSelector";
import toast from "react-hot-toast";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const user = useAppSelector((state) => state.auth.user);

    const navLinks = [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Sidebar",
                    icon: <LuPanelRightClose />,
                    link: "/sidebar",
                },
                { title: "6 sections", icon: <LuHome />, link: "/" },
                {
                    title: "4 sections",
                    icon: <LuLayoutDashboard />,
                    link: "/dashboard_01",
                },
                {
                    title: "5 sections (2/3)",
                    icon: <LuLayoutDashboard />,
                    link: "/dashboard_02",
                },
                {
                    title: "5 sections (3/2)",
                    icon: <LuLayoutDashboard />,
                    link: "/dashboard_03",
                },
                {
                    title: "5 sections (4/1)",
                    icon: <LuLayoutDashboard />,
                    link: "/dashboard_04",
                },
            ],
        },
        {
            title: "Content",
            items: [
                { title: "Guides", icon: <LuFileSpreadsheet />, link: "" },
                { title: "Checklists", icon: <LuLayoutList />, link: "" },
            ],
        },
        {
            title: "Customization",
            items: [
                { title: "Themes", icon: <LuPalette />, link: "" },
                { title: "Settings", icon: <LuSettings />, link: "" },
            ],
        },
    ];

    const handleToggleSidebar = () => {
        setIsShowSidebar((previousState) => !previousState);
    };

    const handleToggleMenu = () => {
        setIsShowMenu((previousState) => !previousState);
    };

    const handleSettings = () => {
        toast.success("Open modal settings");
    };

    const handleSelect = (path: string) => {
        if (path.length > 0) navigate(path);
        setIsShowSidebar(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <>
            {isShowSidebar && (
                <div
                    onClick={() => setIsShowSidebar(false)}
                    className="fixed z-10 inset-0"
                >
                    <div
                        onClick={(event) => event.stopPropagation()}
                        className="absolute glassmorphism z-10 top-20 left-4 flex flex-col w-64 px-4 pb-8 pt-12 overflow-y-auto rounded-lg"
                    >
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((group) => {
                                return (
                                    <div
                                        key={group.title}
                                        className="flex flex-col gap-1"
                                    >
                                        <div className="text-xs text-white/50 uppercase ml-2">
                                            {group.title}
                                        </div>
                                        {group.items.map((item) => {
                                            return (
                                                <div
                                                    key={item.title}
                                                    onClick={() =>
                                                        handleSelect(item.link)
                                                    }
                                                    className="cursor-pointer flex items-center gap-1 p-2 rounded-lg hover:bg-white/20"
                                                >
                                                    {item.icon}
                                                    {item.title}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}
            <header className="z-20 relative backdrop-blur-[2px] bg-black/50 grid grid-cols-3 items-center p-4">
                <div
                    onClick={handleToggleSidebar}
                    className="cursor-pointer text-white text-2xl w-fit"
                >
                    {isShowSidebar ? <LuXCircle /> : <LuMenu />}
                </div>
                <div className="flex justify-center items-center gap-2">
                    <img
                        className="w-6 aspect-square"
                        src="favicon.ico"
                        alt="Logo"
                    />
                    <h1 className="font-bold text-2xl text-white uppercase">
                        InfoSec IOC
                    </h1>
                </div>
                <div className="flex gap-4 justify-end items-center text-white">
                    <div className="group cursor-pointer">
                        <LuBell className="group-hover:hidden text-2xl" />
                        <LuBellRing className="hidden group-hover:block text-2xl" />
                    </div>
                    <div
                        onClick={handleToggleMenu}
                        className="cursor-pointer text-white text-2xl w-fit"
                    >
                        {isShowMenu ? <LuXCircle /> : <LuUserCircle2 />}
                    </div>
                </div>
            </header>
            {isShowMenu && (
                <div
                    onClick={() => setIsShowMenu(false)}
                    className="fixed z-10 inset-0"
                >
                    <div
                        onClick={(event) => event.stopPropagation()}
                        className="absolute z-10 glassmorphism rounded-t-none top-12 right-4 flex-col w-64 px-4 pb-8 pt-12 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="text-xs text-white/50 uppercase ml-2">
                                    Information
                                </div>
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                    <LuUser2 />
                                    {user.name}
                                </div>
                                <div className="flex items-center gap-1 p-2 rounded-lg">
                                    <LuMail />
                                    {user.email}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-xs text-white/50 uppercase ml-2">
                                    Account
                                </div>
                                <div
                                    onClick={handleSettings}
                                    className="cursor-pointer flex items-center gap-1 p-2 rounded-lg hover:bg-white/20"
                                >
                                    <LuSettings2 />
                                    Settings
                                </div>
                                <div
                                    onClick={handleLogout}
                                    className="cursor-pointer flex items-center gap-1 p-2 rounded-lg hover:bg-white/20"
                                >
                                    <LuLogOut />
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
