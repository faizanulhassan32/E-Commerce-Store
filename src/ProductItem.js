import React from "react";

// ProductItem component
const ProductItem = ({ product, onViewMore }) => {
  // rendering products
  return (
    <div className="product-item">
      {/* product image and its alternative text */}
      <img className="product-image" src={product.image} alt={product.title} />
      {/* product title */}
      <div className="product-title-1">{product.title}</div>  
      {/* when users clicks on view more button, display product details */}
      <button className="add-to-cart" onClick={onViewMore}>
        View more
      </button>
    </div>
  );
};

export default ProductItem;
