import React , { useEffect , useContext , useState} from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import App from '../App.jsx'

const ProductCard = (props) => {
  const {  _id ,photos, sellerId, productName, description, price } = props.product ;
  const navigate = useNavigate();

  let id=_id

  const handleClick = () => {
    navigate(`/client/product/${id}`);
  };

  const {serverUrl} = useContext(App.context)

  const [seller,setSeller]=useState({})

  useEffect(() => {
    async function fetchData() {
        try {
            const seller = await axios.get(`${serverUrl}/api/v1/sellers/${sellerId}`, { withCredentials: true });
            setSeller(seller.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    fetchData();
}, []);


  return (
    <div id="product-card" onClick={handleClick}>
      <img src={photos} alt={name} />
      <div className="content">
        <div className="left">
          <h3>{seller?seller.businessName : ""}</h3>
          <h4>{productName}</h4>
          <p>{description}</p>
        </div>
        <div className="right">
          <p>{price} DA</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
