import React, { useState } from "react";
import "./App.css";
import Cart from "./cart";

// ProductDetails component
const ProductDetails = ({ product, onBackButtonClick }) => {

  // setting up state for the quantity
  const [quantity, setQuantity] = useState(0);

  // for navigating to cart
  const [selectedCart, setSelectedCart] = useState(null);

  // check if stocks are enough for the users input or not
  const handleAddToCart = () => {

    if (product.rating.count >= quantity) {
    
      // if valid, then decrement from the products stocks
      product.rating.count -= quantity;

      // Add the new quantity to the quantitiesList array
      const obj = { title: product.title, quantity };
      const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

      // Check if the product is already in the purchases array
      const index = purchases.findIndex((p) => p.title === obj.title);

      if (index !== -1) {
        // If the product is already in the purchases array, update its quantity
        purchases[index].quantity += obj.quantity;
      } else {
        // If the product is not in the purchases array, add it
        purchases.push(obj);
      }

      // Update the purchases array and total amount in local storage
      const totalPrice =
        parseFloat(localStorage.getItem("totalPrice") || 0) +
        parseFloat(product.price) * quantity;
      localStorage.setItem("purchases", JSON.stringify(purchases));
      localStorage.setItem("totalPrice", totalPrice.toFixed(2));

      // printing on the console
      console.log("Added to cart in product");
      console.log("Remaining : ", product.rating.count);
    } else {
      // printing on the console
      console.log("Not enough stock available");
      console.log("Remaining : ", product.rating.count);
    }
  };

  // for navigating to the cart component
  const handleCartButtonClick = () => {
    setSelectedCart(true);
  };

  // Render the cart in a new component
  if (selectedCart) {
    return <Cart />;
  }
  

  // rendering products
  return (
    <div className="product-item">
      {/* product title */}
      <div className="product-title-2">{product.title}</div>

      {/* product image and its alternative text */}
      <img className="product-image" src={product.image} alt={product.title} />

      {/* product price */}
      <div className="product-price">${product.price}</div>

      {/* product description */}
      <div className="product-description">{product.description}</div>

      {/* product items available in stock */}
      <div className="product-stock">
        <label className="labels">In Stock : </label> {product.rating.count}
      </div>

      {/* taking users input about no of items to buy */}
      <div className="product-quantity">
        <label className="labels">Quantity : </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </div>

      {/* colors for items */}
      <div className="buttons-container">
        <label className="labels">Color :</label>

        <button className="add-to-cart-black">Black</button>
        <button className="add-to-cart-red">Red</button>
        <button className="add-to-cart-blue">Blue</button>
        <button className="add-to-cart-green">Green</button>
        <button className="add-to-cart-white">White</button>
      </div>

      {/* when users clicks on add to cart button, make changes to stock */}
      <button className="add-to-cart" onClick={handleAddToCart}>
        Add to cart
      </button>

      {/* "Back" button */}
      <button className="add-to-cart" onClick={onBackButtonClick}>
        Back to Mainpage
      </button>
      
      <button className="add-to-cart" onClick={handleCartButtonClick}>
          Cart
      </button>

    </div>
  );
};


export default ProductDetails;  
