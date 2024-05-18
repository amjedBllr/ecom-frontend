import React from "react";
import { useContext, createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

//?client imports
import ClientProfile from "./pages/client/ClientProfile";
import ClientHome from "./pages/client/ClientHome.jsx";
import ClientLayout from "./layouts/ClientLayout";
import ClientInfo from "./pages/client/ClientInfo";
import SearchPage from "./pages/client/SearchPage";
import Payment from "./pages/client/Payment.jsx";

//?seller imports
import SellerLayout from "./layouts/SellerLayout";
import SellerHome from "./pages/seller/SellerHome";
import SellerStore from "./pages/seller/SellerStore";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerProfile from "./pages/seller/SellerProfile";
import SellerInfo from "./pages/seller/SellerInfo";

//?general imports
import HomePage from "./pages/HomePage";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ProductPage from "./pages/ProductPage.jsx";
import AboutUs from "./pages/AboutUs";
import NotFoundPage from "./pages/NotFoundPage";
import Loading from "./components/Loading.jsx";

const context = createContext();

function App() {
  const [serverUrl, setServerUrl] = useState('http://localhost:3000');
  const [userinfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [changed, setChanged] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // New state for loading indicator

  useEffect(() => {
      async function fetchData() {
          try {
              const info = await axios.get(`${serverUrl}/api/v1/auth/userinfo`, { withCredentials: true });
              setUserInfo(info.data.data);
              setIsLoggedIn(true);
              setUserRole(info.data.data.user_info.role);
              setIsLoading(false); // Set loading to false after fetching data
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
                  </Route>

                  {/* Authenticated paths */}
                  {userRole === 'client' && (
                      <>
                          {/* Client paths */}
                          <Route path='/client' element={<ClientLayout/>}>
                              <Route path='home' element={<ClientHome/>}/>
                              <Route path='about-us' element={<AboutUs/>}/>
                              <Route path='profile' element={<ClientProfile/>}/>
                              <Route path='product' element={<ProductPage />}/>
                              <Route path='payment/:id' element={<Payment />}/>
                              <Route path='*' element={<NotFoundPage dest='/client/home'/>}/>
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
                              <Route path='*' element={<NotFoundPage dest='/seller/home/store'/>}/>
                          </Route>
                          <Route path='/seller/home' element={<SellerHome/>}>
                              <Route path='store' element={<SellerStore/>}/>
                              <Route path='orders' element={<SellerOrders/>}/>
                              <Route path='*' element={<NotFoundPage dest='/seller/home/store'/>}/>
                          </Route>
                      </>
                  )}

                  {userRole === 'admin' && (
                      <>
                          {/* Admin paths */}
                          <Route path='/admin'>
                              <Route path='sign-in' element={""}/>
                              <Route path='register' element={""}/>
                              <Route path='register/client' element={""}/>
                              <Route path='register/seller' element={""}/>
                          </Route>
                      </>
                  )}

                  <Route path='*' element={<NotFoundPage dest='/'/>}/>
              </Routes>
          )}
      </context.Provider>
  );
}

export default App;
