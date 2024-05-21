import React, { useState } from 'react';
import { Link } from "react-router-dom";

const SellerFirstNav = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header id="seller-first-nav">
      <nav>
        <ul className="right">
          <li>
            <Link to="/admin/help">help</Link>
          </li>
          <li>
            <Link to="/admin/about-us">About</Link>
          </li>
        </ul>
        <Link to='/admin/home/users' className="logo">
          SouqKantra
        </Link>
        <ul className="left">
          <li>
            <img src="../../public/icons/notification.png" alt="Notifications" />
          </li>
          <li className="dropdown">
            <img
              src="../../public/icons/img_lock.svg"
              alt="Profile"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/admin/profile" onClick={() => setDropdownVisible(false)}>Profile</Link>
                <Link to="/logout" onClick={() => setDropdownVisible(false)}>Logout</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <style>
        {`
          .dropdown-menu {
            position: absolute;
            right: 4rem;
            top: 4rem; /* Adjust this value based on your header height */
            background-color: white;
            border: 1px solid #ccc;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
          }

          .dropdown-menu a {
            display: block;
            padding: 10px 20px;
            text-decoration: none;
            color: #333;
          }

          .dropdown-menu a:hover {
            background-color: #f0f0f0;
          }
        `}
      </style>
    </header>
  );
};

export default SellerFirstNav;
