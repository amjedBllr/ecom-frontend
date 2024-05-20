import React from "react";
import { useState , useEffect , useContext} from "react";
import App from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {

  
  const navigate = useNavigate()

  const {userRole} = useContext(App.context)

  const { _id , photos, productName, description, price } = props.product
  
  const handleClick = () => {
    navigate(`/${userRole}/product/${_id||3000}`);
  };


  return (
    <div id="product-card" onClick={handleClick} >
      <img src={photos[0]} alt={name} />
      <div className="content">
        <div className="left">
          <h3>{props.seller.businessName}</h3>
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
