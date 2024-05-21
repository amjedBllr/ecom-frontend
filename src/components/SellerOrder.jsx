import React, { useState, useEffect, useContext } from 'react';
import App from '../App.jsx';
import axios from 'axios';

const SellerOrder = (props) => {
  const {
    clientId,
    color,
    dimension,
    orderDate,
    orderStatus,
    paymentMethod,
    productId,
    quantity,
    shippingAddress,
    size,
    totalPrice,
    _id
  } = props.order;

  const [client, setClient] = useState({});
  const [product, setProduct] = useState({});
  const { serverUrl } = useContext(App.context);
  const [status, setStatus] = useState(orderStatus);

  const handleStatusChange = async (e) => {
    const { value } = e.target;
    setStatus(value);
    try {
      await axios.patch(`${serverUrl}/api/v1/orders/${_id}`, { orderStatus: value }, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const cli = await axios.get(`${serverUrl}/api/v1/clients/${clientId}`, { withCredentials: true });
        setClient(cli.data.data || {});
        const prod = await axios.get(`${serverUrl}/api/v1/products/${productId}`, { withCredentials: true });
        setProduct(prod.data.data || {});
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [serverUrl, clientId, productId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'red';
      case 'delivered':
        return 'green';
      case 'processing':
        return 'orange';
      case 'In Transit':
        return 'blue';
      case 'cancelled':
        return 'gray';
      case 'returned':
        return 'purple';
      case 'refunded':
        return 'yellow';
      default:
        return 'black';
    }
  };

  return (
    <div className="seller-order">
      <div className="product">
        {product.photos && <img src={product.photos[0]} alt={product.productName} />}
        <div className="content">
          <h4>{product.productName}</h4>
          <p>{product.description}</p>
        </div>
      </div>
      <p className="quant">x{quantity}</p>
      <p className="color">{color}</p>
      <p className="size">{size}</p>
      <p className="dim">{dimension}</p>
      <p className="client">{client.fullname}</p>
      <p className="price">{totalPrice} DA</p>
      <p className="PM">{paymentMethod}</p>
      <p className="SA">{shippingAddress}</p>
      <p className="date">{orderDate.split('T')[0]}<br />{new Date(orderDate).toLocaleTimeString()}</p>
      <select name="orderStatus" value={status} className="status" onChange={handleStatusChange}>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="In Transit">In Transit</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
        <option value="returned">Returned</option>
        <option value="refunded">Refunded</option>
      </select>
      <div className="status-color" style={{ backgroundColor: getStatusColor(status) }}></div>
    </div>
  );
};

export default SellerOrder;
