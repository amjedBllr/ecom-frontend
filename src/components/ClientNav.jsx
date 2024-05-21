import React, { useState } from 'react';
import { Link } from "react-router-dom";
import CategoryList from "./Header/HeaderLinks";

const ClientNav = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header id="client-nav">
      <nav>
        <ul className="right">
          <li>
            <Link to="/client/help">help</Link>
          </li>
          <li>
            <Link to="/client/about-us">About</Link>
          </li>
          <li>
            <Link to="/client/comparator">Comparator</Link>
          </li>
        </ul>
        <Link to='/client/home' className="logo">
          SouqKantra
        </Link>
        <ul className="left">
          <li>
            <Link to="/client/search"><img src="../../public/icons/img_rewind.svg" alt="Search" /></Link>
          </li>
          <li>
            <Link to="/client/cart"><img src="../../public/icons/bag.svg" alt="Cart" /></Link>
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
                <Link to="/client/profile" onClick={() => setDropdownVisible(false)}>Profile</Link>
                <Link to="/logout" onClick={() => setDropdownVisible(false)}>Logout</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <CategoryList />
      <div className="w-full h-8 text-text font-bold bg-primary flex justify-center items-center leading-tight">
        <p>free shipping on all orders over 10000DA</p>
      </div>
      <style>
        {`
          .dropdown-menu {
            position: absolute;
            right: 1rem;
            top: 5rem; /* Adjust this value based on your header height */
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

export default ClientNav;
