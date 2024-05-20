import React from "react";
import { createContext, useState, useEffect } from "react";
import { Routes, Route , useNavigate } from "react-router-dom";
import axios from "axios";

//?client imports
import ClientProductPage from "./pages/client/clientProductPage.jsx";
import ClientProfile from "./pages/client/ClientProfile";
import ClientHome from "./pages/client/ClientHome.jsx";
import ClientLayout from "./layouts/ClientLayout";
import ClientInfo from "./pages/client/ClientInfo";
import SearchPage from "./pages/client/SearchPage";
import Payment from "./pages/client/Payment.jsx";
import CheckOut from "./pages/client/CheckOut.jsx";

//?seller imports
import SellerProductPage from "./pages/seller/sellerProductPage.jsx";
import SellerLayout from "./layouts/SellerLayout";
import SellerHome from "./pages/seller/SellerHome";
import SellerStore from "./pages/seller/SellerStore";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerProfile from "./pages/seller/SellerProfile";
import SellerInfo from "./pages/seller/SellerInfo";
import SellerEditProduct from "./pages/seller/SellerEditProduct.jsx";

//?admin imports 
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdmineHome from "./pages/admin/AdminHome.jsx";
import UserMangement from "./pages/admin/UserMangement.jsx";
import AdminQA from "./pages/admin/AdminQA.jsx";
import ReportTreatment from "./pages/admin/ReportTreatment.jsx";
import ProductsManagement from "./pages/admin/ProductsManagement.jsx";
import AdminProfile from "./pages/admin/AdminProfile.jsx";



//?general imports
import CategoryPage from "./pages/seller/CategoryPage.jsx";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import AboutUs from "./pages/AboutUs";
import NotFoundPage from "./pages/NotFoundPage";
import Loading from "./components/Loading.jsx";
import Logout from "./pages/Auth/Logout.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";






const context = createContext();

function App() {


  const [serverUrl, setServerUrl] = useState('http://localhost:3000');
  const [userinfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [changed, setChanged] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // New state for loading indicator

  const navigate = useNavigate();

  useEffect(() => {
      async function fetchData() {
          try {
              const info = await axios.get(`${serverUrl}/api/v1/auth/userinfo`, { withCredentials: true });
              setUserInfo(info.data.data);
              setIsLoggedIn(true);
              const role = info.data.data.user_info.role
              setUserRole(role);
              setIsLoading(false);
          } catch (error) {
              console.log(error);
              setIsLoggedIn(false);
              setIsLoading(false); // Set loading to false in case of error
          }
      }

      if (changed) {
          setIsLoading(true); // Set loading to true before fetching data
          fetchData();
          setChanged(false); // Reset the 'changed' state after triggering the effect
      }
  }, [changed]);

  let values = {
      serverUrl, 
      isLoggedIn, 
      userinfo, 
      userRole, 
      setChanged
  };

  return (
      <context.Provider value={values}>
          {isLoading ? ( // Render loading indicator if isLoading is true
              <Loading/>
          ) : (
              <Routes>
                  {/* Unauthenticated paths */}
                  <Route path='/'>
                      <Route index element={<HomePage/>}/>
                      <Route path='sign-in' element={<SignIn/>}/>
                      <Route path='register' element={<SignUp/>}/>
                      <Route path='register/client' element={<ClientInfo/>}/>
                      <Route path='register/seller' element={<SellerInfo/>}/>
                      <Route path='about' element={<><Header/><AboutUs/><Footer/></>}/>
                      <Route path='logout' element={<Logout/>}/>
                  </Route>

                  {/* Authenticated paths */}
                 
                  {userRole === 'client' && (
                      <>
                          {/* Client paths */}
                          <Route path='/client' element={<ClientLayout/>}>
                              <Route path='home' element={<ClientHome/>}/>
                              <Route path='about-us' element={<AboutUs/>}/>
                              <Route path='profile' element={<ClientProfile/>}/>
                              <Route path="cart" element={<CheckOut />} />
                              <Route path="products/type/:category" element={<CategoryPage />} />
                              <Route path="product/:id" element={<ClientProductPage />} />
                              <Route path='payment/:id' element={<Payment />}/>
                              <Route path='*' element={<NotFoundPage/>}/>
                          </Route>
                          <Route path='/client/search' element={<SearchPage/>}/>
                      </>
                  )}

                  {userRole === 'seller' && (
                      <>
                          {/* Seller paths */}
                          <Route path='/seller' element={<SellerLayout/>}>
                              <Route path='profile' element={<SellerProfile/>}/>
                              <Route path='about-us' element={<AboutUs/>}/>
                              <Route path='*' element={<NotFoundPage/>}/>
                              <Route path="product/:id" element={<SellerEditProduct/>} />
                          </Route>
                          <Route path='/seller/home' element={<SellerHome/>}>
                              <Route path='store' element={<SellerStore/>}/>
                              <Route path='orders' element={<SellerOrders/>}/>
                              <Route path='*' element={<NotFoundPage/>}/>
                          </Route>
                      </>
                  )}

                  {userRole === 'admin' && (
                      <>
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route path="home" element={<AdmineHome />} />
                            <Route path="users" element={<UserMangement />} />
                            <Route path="help" element={<AdminQA />} />
                            <Route path="about" element={<AboutUs />} />
                            <Route path="reports" element={<ReportTreatment />} />
                            <Route path="profile" element={<AdminProfile />} />
                            <Route path="product-managemnt" element={<ProductsManagement />} />
                            <Route path="*" element={<NotFoundPage dest="/admin/home" />} />
                        </Route>
                      </>
                  )}

                  <Route path='*' element={<NotFoundPage/>}/>
              </Routes>
          )}
      </context.Provider>
  );
}

export default {App,context};
