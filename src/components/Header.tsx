import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../store/slices/auth";
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
} from "react-icons/lu";
import { useAppSelector } from "../hooks/useAppSelector";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const userName = useAppSelector((state) => state.auth.user.name);

  const navLinks = [
    {
      title: "Dashboard",
      items: [
        { title: "6 sections", icon: <LuHome />, link: "/" },
        { title: "4 sections", icon: <LuLayoutDashboard />, link: "/dashboard_01" },
        { title: "5 sections (2/3)", icon: <LuLayoutDashboard />, link: "/dashboard_02" },
        { title: "5 sections (3/2)", icon: <LuLayoutDashboard />, link: "/dashboard_03" },
        { title: "5 sections (4/1)", icon: <LuLayoutDashboard />, link: "/dashboard_04" },
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
        <div onClick={() => setIsShowSidebar(false)} className="fixed z-10 inset-0">
          <div
            onClick={(event) => event.stopPropagation()}
            className="absolute glassmorphism rounded-t-none z-10 top-16 left-4 flex flex-col w-64 px-4 py-8 overflow-y-auto"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((group) => {
                return (
                  <div key={group.title} className="flex flex-col gap-1">
                    <div className="text-xs text-white/50 uppercase ml-2">{group.title}</div>
                    {group.items.map((item) => {
                      return (
                        <div
                          key={item.title}
                          onClick={() => handleSelect(item.link)}
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
      <header className="z-20 glassmorphism grid grid-cols-3 items-center px-4">
        <div onClick={handleToggleSidebar} className="cursor-pointer text-white text-2xl w-fit">
          {isShowSidebar ? <LuXCircle /> : <LuMenu />}
        </div>
        <div className="flex justify-center items-center gap-2">
          <img src="favicon.ico" alt="Logo" />
          <h1 className="font-bold text-4xl">InfoSec IOC</h1>
        </div>
        <div className="flex gap-4 justify-end items-center text-white">
          <LuBell className="text-2xl" />
          <div onClick={handleLogout} className="flex items-center gap-1">
            <LuUserCircle2 className="text-2xl" />
            <div className="font-bold text-sm">Hi, {userName}!</div>
            {/* <div
              onClick={(event) => event.stopPropagation()}
              className="hidden group-hover:flex absolute glassmorphism top-8 right-0 flex-col w-64 px-4 py-8 overflow-y-auto"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-white/50 uppercase ml-2">Information</div>
                  <div
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center gap-1 p-2 rounded-lg hover:bg-white/20"
                  >
                    Username
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-white/50 uppercase ml-2">Account</div>
                  <div
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center gap-1 p-2 rounded-lg hover:bg-white/20"
                  >
                    <LuLogOut />
                    Logout
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
