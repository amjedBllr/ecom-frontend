import React from "react";

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {relatedProducts.map((product) => (
        <ProductThumbnail key={product.id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
const ProductThumbnail = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover mb-2 rounded"
      />
      <h2 className="text-lg font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700">${product.price.toFixed(2)}</p>
    </div>
  );
};
