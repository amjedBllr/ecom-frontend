import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate hook
import axios from 'axios';
import App from '../../App.jsx';
import { useContext } from 'react';

const Logout = () => {
  const navigate = useNavigate(); // Call useNavigate hook to get navigation function
  const { setChanged, userRole, isLoggedIn } = useContext(App.context);

  const handleLogout = async () => {
    try {
      const logout = await axios.get(`http://localhost:3000/api/v1/auth/logout`, { withCredentials: true });
      setChanged(true);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    if (isLoggedIn) {
      if (userRole === 'client') navigate('/client/home');
      else if (userRole === 'seller') navigate('/seller/home/store');
      else if (userRole === 'admin') navigate('/admin/home');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <div className="logout-container fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-opacity-50 z-50 ">
      {/* Rest of the logout content remains the same */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Are You Sure?</h1>
      <p className="text-gray-700 mb-8">Clicking "Logout" will end your current session.</p>
      <div className="button-container flex justify-center space-x-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow focus:outline-none hover:bg-red-700"
        >
          Logout
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-400 text-white font-medium rounded-md shadow focus:outline-none hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
