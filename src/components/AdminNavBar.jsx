import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import NotificationsModal from "../Modals/NotificationsModal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DefaultSidebar from "./Admin/AdminSideBar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
const AdminNavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen z-12">
      <header className="pl-20 " id="seller-first-nav">
        <nav>
          <ul className="right">
            <li>
              <Link to="help">help</Link>
            </li>
            <li>
              <Link to="about">About</Link>
            </li>
          </ul>
          <Link to="/admin/home" className="logo">
            souqKantra
          </Link>
          <ul className="flex items-center gap-8">
            <li>
              <div className="relative">
                <NotificationsModal />
              </div>
            </li>
            <li>
              <Link to="profile">
                <img src="../../public/icons/img_lock.svg" />
              </Link>
            </li>
            <li>
              <IconButton onClick={toggleSidebar}>
                <Bars3Icon className="h-6 w-6" />
              </IconButton>
            </li>
          </ul>
        </nav>
      </header>
      <div className="flex flex-row flex-1">
        <DefaultSidebar isSidebarOpen={isSidebarOpen} />
        <div
          className={`${
            isSidebarOpen ? "ml-64" : ""
          } flex-1 transition-all duration-300 ease-in-out`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
