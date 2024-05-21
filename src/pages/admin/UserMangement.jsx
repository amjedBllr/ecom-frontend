import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserCard from "../../components/Admin/UserCard.jsx";
import App from '../../App';

const UserMangement = () => {
  const [filters, setFilters] = useState({
    hideClients: false,
    sortDate: false,
    hideSellers:false
  });

  let [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { serverUrl } = useContext(App.context);

  const handleClick = (event) => {
    const { name } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    applyFilters();
  }, [filters, users]);

  const applyFilters = () => {
    let updatedUsers = [...users];

    if (filters.hideClients) {
      updatedUsers = updatedUsers.filter(user => user.role !== 'client');
    }
    
    if (filters.hideSellers) {
      updatedUsers = updatedUsers.filter(user => user.role !== 'seller');
    }

    if (filters.sortDate) {
      updatedUsers.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
    }

    setFilteredUsers(updatedUsers);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${serverUrl}/api/v1/users`, { withCredentials: true });
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [serverUrl]);

  return (
    <div>
      <div id="seller-orders">
        <div className="title">
          <h2>
            User Management
            <br />
            <span>(validation)</span>
          </h2>
          <p></p>
          <hr className="hr" />
        </div>

        <div className="ml-40 flex justify-start items-center pb-4">
          <div className="flex justify-center items-center mr-12">
            <label
              htmlFor="hideClients"
              className="text-gray-700 text-2xl w-full text-nowrap font-bold"
            >
              Hide clients
            </label>
            <input
              className="ml-2"
              style={{ height: "24px", width: "24px" }}
              type="checkbox"
              name="hideClients"
              checked={filters.hideClients}
              onChange={handleClick}
            />
          </div>
          <div className="flex justify-center items-center mr-12">
            <label
              htmlFor="hideSellers"
              className="text-gray-700 text-2xl w-full text-nowrap font-bold"
            >
              Hide sellers
            </label>
            <input
              className="ml-2"
              style={{ height: "24px", width: "24px" }}
              type="checkbox"
              name="hideSellers"
              checked={filters.hideSellers}
              onChange={handleClick}
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="sortDate"
              className="text-gray-700 text-2xl w-full text-nowrap ml-4 font-bold"
            >
              Sort by date
            </label>
            <input
              className="mr-2 h-8 w-8"
              style={{ height: "30px", width: "30px" }}
              type="checkbox"
              name="sortDate"
              checked={filters.sortDate}
              onChange={handleClick}
            />
          </div>
        </div>
        <hr className="hr" />

        <div className="relative">
          <div className="orders">
            <div className="w-[95%] mb-[-20px]">
              <div className="grid grid-cols-10 w-[100%] my-4 pl-12">
                <p className="col-span-2">Email</p>
                <p className="col-span-1">Role</p>
                <p className="col-span-2">Registration Date</p>
                <p className="col-span-1">Status</p>
                <p className="col-span-4 text-center">Management</p>
              </div>
              <hr className="w-full outline-none border-blue-500 my-4 opacity-80" />
            </div>

            {
              filteredUsers.map((user) => {
                return (<UserCard key={user._id} user={user} />);
              })
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMangement;
