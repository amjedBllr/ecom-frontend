import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate hook
import axios from 'axios';
import App from '../../App.jsx'
import { useContext } from 'react';

const Logout = () => {
  const navigate = useNavigate(); // Call useNavigate hook to get navigation function
  const {setChanged , userRole , isLoggedIn} = useContext(App.context)

  const handleLogout = async() => {
    try {
        const logout = await axios.get(`http://localhost:3000/api/v1/auth/logout`, { withCredentials: true });
        setChanged(true)
        navigate('/');
    } catch (error) {
      console.log(error)
    }
  };

  const handleCancel = () => {
    if(isLoggedIn){
      if(userRole === 'client') navigate('/client/home')
        else if(userRole === 'seller') navigate('/seller/home/store')
        else if(userRole === 'admin') navigate('/admin/home')
    }
  else  navigate('/sign-in')
    
};


  return (
    <div className="logout-container">
      <h1>Are You Sure?</h1>
      <p>Clicking "Logout" will end your current session.</p>
      <div className="button-container">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Logout;
