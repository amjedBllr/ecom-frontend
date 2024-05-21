import React, { useState, useEffect, useContext } from 'react';
import SellerOrder from '../../components/SellerOrder.jsx';
import App from '../../App';
import axios from 'axios';

const SellerOrders = () => {
  const [filters, setFilters] = useState({
    hideDelivered: false,
    sortDate: false
  });
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const { serverUrl } = useContext(App.context);

  const handleClick = (event) => {
    const { name } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${serverUrl}/api/v1/sellers/orders`, { withCredentials: true });
        setOrders(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [serverUrl]);

  useEffect(() => {
    applyFilters();
  }, [filters, orders]);

  const applyFilters = () => {
    let updatedOrders = [...orders];

    if (filters.hideDelivered) {
      updatedOrders = updatedOrders.filter(order => order.orderStatus !== 'delivered');
    }

    if (filters.sortDate) {
      updatedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    }

    setFilteredOrders(updatedOrders);
  };

  return (
    <div id='seller-orders'>
      <div className="title">
        <h2>Orders<br /><span>(Confirmed purchases)</span></h2>
        <hr />
      </div>
      <div className="filters">
        <input type='checkbox' name='hideDelivered' checked={filters.hideDelivered} onChange={handleClick} />
        <label htmlFor='hideDelivered'>Hide delivered orders</label>
        <input type='checkbox' name='sortDate' checked={filters.sortDate} onChange={handleClick} />
        <label htmlFor='sortDate'>Sort by date</label>
      </div>
      <hr />
      <div className="orders">
        {filteredOrders.map(order => (
          <SellerOrder key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default SellerOrders;
