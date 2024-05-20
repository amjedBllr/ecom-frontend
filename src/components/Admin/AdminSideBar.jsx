import { Link } from "react-router-dom";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { BsBoxes } from "react-icons/bs";
import { RiExportFill } from "react-icons/ri";
import { UsersIcon } from "@heroicons/react/24/solid";

export function DefaultSidebar({ isSidebarOpen }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full z-15 ${
        isSidebarOpen ? "w-60" : "w-0"
      } transition-width duration-300 ease-in-out overflow-y-auto `}
    >
      <Card className="h-full p-4 !rounded-none shadow-xl shadow-blue-gray-900/5 bg-slate-300">
        <List>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="home">Dashboard</Link>
          </ListItem>

          <Link to="users">
            <ListItem>
              <ListItemPrefix>
                <UsersIcon className="h-5 w-5" />
              </ListItemPrefix>
              Users Management
            </ListItem>
          </Link>
          <Link to="product-managemnt">
            <ListItem>
              <ListItemPrefix>
                <BsBoxes className="h-5 w-5" />
              </ListItemPrefix>
              Product Management
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className=""
                />
              </ListItemSuffix>
            </ListItem>
          </Link>
          <Link to="profile">
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </Link>
          <Link to="reports">
            <ListItem>
              <ListItemPrefix>
                <RiExportFill className="h-5 w-5" />
              </ListItemPrefix>
              Reports
            </ListItem>
          </Link>
          <Link to="logout">
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </Link>
        </List>
      </Card>
    </div>
  );
}

export default DefaultSidebar;
