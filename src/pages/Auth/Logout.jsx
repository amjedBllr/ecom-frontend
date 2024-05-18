import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate hook
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate(); // Call useNavigate hook to get navigation function

  const handleLogout = async() => {
    try {
        const logout = await axios.get(`http://localhost:3000/api/v1/auth/logout`, { withCredentials: true });
        navigate('/sign-in');
        console.log('User logged out !')
    } catch (error) {
        console.log(error)
    }
  };

  const handleCancel = () => {
    navigate('/sign-in'); // Use navigate function to redirect
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
