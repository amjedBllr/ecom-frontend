import React , {useState} from 'react'
import { Outlet , Link } from 'react-router-dom'
import AdminNavBar from "../../components/AdminNavBar.jsx";
import AdminSecondNav from '../../components/AdminSecondNav.jsx'
import Footer from '../../components/Footer.jsx'
import SellerSecondNav from '../../components/SellerSecondNav.jsx';


function AdminHome() {
  return (
    <>
      <AdminNavBar/>
      <AdminSecondNav/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default AdminHome ;
