import Footer from "../components/Footer";
import AdminNavbar from "../components/AdminNavBar.jsx";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Footer />
    </div>
  );
};

export default AdminLayout;
