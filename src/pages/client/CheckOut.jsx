import React, { useState } from "react";
import ClientOrder from "../../components/ClientOrder.jsx";
import axios from 'axios';
import { useEffect , useContext} from 'react';
import App from '../../App.jsx'

const CheckOut = () => {

  const [cart , setCart] = useState([])
  const [orders , setOrders] = useState([])

  const {serverUrl} = useContext(App.context)

  useEffect(()=>{
    async function fetchData() {
      try {

        
        const items = await axios.get(`${serverUrl}/api/v1/clients/cart-items`,{withCredentials:true});
        setCart(items.data.data)
        console.log(items.data.data)
        
          const ors = await axios.get(`${serverUrl}/api/v1/clients/orders`,{withCredentials:true});
          setOrders(ors.data.data)


      } catch (error) {
          console.log(error);
      }
  }
  fetchData();
  },[])


  return (
    <div id="seller-orders">
      <div className="title">
        <h2>
          Orders
          <br />
          <span>(Confirmed purchases)</span>
        </h2>
        <p></p>
        <hr />
      </div>
      <div className="orders">
        {orders.map(o=>{
          return(<ClientOrder item={o} confirmed={true} />)
        })}
      </div>
      <div className="title">
        <h2>
          Cart
          <br />
          <span>(Unconfirmed purchases)</span>
        </h2>
        <p></p>
        <hr />
      </div>
      <div className="orders">
      {cart.map(o=>{
          return(<ClientOrder item={o} confirmed={false} />)
        })}
      </div>
    </div>
  );
};

export default CheckOut;
