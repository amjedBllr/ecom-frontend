import React from 'react'
import { Outlet } from 'react-router-dom';
import ClientNav from '../components/ClientNav';
import Footer from "../components/Footer";
function ClientLayout() {
  return (
    <>
        <ClientNav/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default ClientLayout