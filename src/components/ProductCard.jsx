import React from "react";
import { useNavigate } from "react-router-dom";
const ProductCard = (props) => {
  const { imgUrl, sellerName, productName, discription, price } = props.product ;
  const navigate = useNavigate();
  let id
  const handleClick = () => {
    navigate(`/client/product/${id}`);
  };
  return (
    <div id="product-card" onClick={handleClick}>
      <img src={imgUrl} alt={name} />
      <div className="content">
        <div className="left">
          <h3>{sellerName}</h3>
          <h4>{productName}</h4>
          <p>{discription}</p>
        </div>
        <div className="right">
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
