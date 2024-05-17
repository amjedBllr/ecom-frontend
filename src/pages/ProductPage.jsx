import React from 'react';
import { useState } from 'react';

const ProductPage = () => {
  const productData = {
    photo: 'https://th.bing.com/th/id/OIP.Vjc2mjVevammzcRh51Hv5QHaEo?w=251&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7', // Replace with actual image path
    name: 'Awesome Product',
    seller: 'Top Seller',
    description: 'This is a fantastic product that you absolutely need!',
    rate: 4.8,
    price: 29.99,
    brand: 'Brand X',
    colors: ['Red', 'Blue', 'Green'],
    sizes: ['S', 'M', 'L', 'XL'],
    dimensions: '10 x 15 x 2 inches',
    reviews: [
      {
        reviewerName: 'John Doe',
        rate: 5,
        comment: 'This product is amazing! Highly recommend.',
      },
      {
        reviewerName: 'Jane Smith',
        rate: 4,
        comment: 'Great product, but could be slightly bigger.',
      },
    ],
  };

  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <div className="product-page">
      <div className="product-info">
        <img src={productData.photo} alt={productData.name} />
        <div className="product-details">
          <h2>{productData.name}</h2>
          <p className="seller">by {productData.seller}</p>
          <p className="description">{productData.description}</p>
          <div className="product-attributes">
            <div>
              <span>Rate:</span>
              <span>{productData.rate} out of 5</span>
            </div>
            <div>
              <span>Price:</span>
              <span>${productData.price}</span>
            </div>
            <div>
              <span>Brand:</span>
              <span>{productData.brand}</span>
            </div>
            <div>
              <span>Dimensions:</span>
              <span>{productData.dimensions}</span>
            </div>
            <div>
              <span>Available Colors:</span>
              <select value={selectedColor} onChange={handleColorChange}>
                {productData.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span>Available Sizes:</span>
              <select value={selectedSize} onChange={handleSizeChange}>
                {productData.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button>Add to Cart</button>
        </div>
      </div>
      <div className="reviews">
        <h2>Reviews</h2>
        {productData.reviews.length > 0 ? (
          productData.reviews.map((review) => (
            <div key={review.reviewerName} className="review-item">
              <p>
                <strong>{review.reviewerName}</strong> - {review.rate} out of 10
              </p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>There are currently no reviews for this product.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
