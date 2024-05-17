import { useState } from "react";
import React from "react";


const ProductCard = (props) => {

  const [isPopOutOpen, setIsPopOutOpen] = useState(false);

  const togglePopOut = () => {
    setIsPopOutOpen(!isPopOutOpen);
  };

  const {photos,name,sellerName,discrtiption,price} = props.data
  return (
    <div id="product-card" onClick={togglePopOut}>
      <img src={photos} alt={name} />
      <div className="content">
        <div className="left">
          <h3>{sellerName}</h3>
          <h4>{name}</h4>
          <p>{discrtiption}</p>
        </div>
        <div className="right">
        <p>{price}DA</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
