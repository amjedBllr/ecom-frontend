import React from 'react'

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import App from '../App';

const NotFoundPage = () => {

  const { isLoggedIn , userRole} = useContext(App.context);
  const navigate = useNavigate();
  const handleSub = ()=>{
    if(isLoggedIn){
      if(userRole === 'client') navigate('/client/home')
      else if(userRole === 'seller') navigate('/seller/home/store')
      else if(userRole === 'admin') navigate('/admin/home')
    }
    else {
      navigate('/')
    }
  }

  return (
    <>
        <div id="not-found">
            <div className="text-box">
                <h1>Oops!</h1>
                <p>Looks like the page you're looking for got lost in space...</p>
                <p>Don't worry,  we'll help you get back on track.</p>
                <button className="btn" onClick={handleSub}  >Go Back Home</button>
                </div>
        </div>
    </>
  )
}

export default NotFoundPage


