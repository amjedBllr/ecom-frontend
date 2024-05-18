import React from "react";
import { useNavigate } from "react-router-dom";
const ProductCard = (props) => {
  const { photos, productName, discrtiption, price } = props.data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/client/product/${id||3000}`,{state:product});
  };
  return (
    <div id="product-card" onClick={handleClick}>
      <img src={photos[0]} alt={name} />
      <div className="content">
        <div className="left">
          <h3>seller name</h3>
          <h4>{productName}</h4>
          <p>{discrtiption}</p>
        </div>
        <div className="right">
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
