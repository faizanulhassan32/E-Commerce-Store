import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ProductItem from "./ProductItem";
import ProductDetails from "./ProductDetails";
import Cart from "./cart";

// ProductsList component
const ProductsList = () => {

  
  const [products, setProducts] = useState([]);   // setting up state for the product and search query
  const [search, setSearch] = useState("");   // for searching items
  const [chosenproduct, setchosenproduct] = useState(null);   // changing page to view more
  const [shoppingcart, setshoppingcart] = useState(null);   // for navigating to cart

  // fetching product from the fake api
  // second arguement is empty array so this runs only when component is mounted, so data is fetched only once
  useEffect(() => {
    const fetchdatafromAPI = async () => {

      const response = await axios.get("https://fakestoreapi.com/products");
      console.log(response.data);

      // react hook to update the product state
      setProducts(response.data);
    };

    // calling function again
    fetchdatafromAPI();
  }, []);

  // helping code for the search option & filter function creates an array of the matching elements
  const searchproducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Render the selected product details in a new component
  const gotoviewmore = (product) => {
    setchosenproduct(product);
  };

  // this for  the back button thats inside the details component
  const gobackbutton = () => {
    setchosenproduct(null);
  };

  // for navigating to the cart component
  const gotocart = () => {
    setshoppingcart(true);
  };

  // for navigating back to the main page form the details page
  if (chosenproduct) {
    return <ProductDetails product={chosenproduct} onBackButtonClick={gobackbutton} />;
  }

  // Render the cart in a new component
  if (shoppingcart) {
    return <Cart />;
  }

  return (
    <div>
      {/* for the search bar, users value in search variable, setSearch sets the value */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="add-to-cart" onClick={gotocart}>
          Cart
        </button>
      </div>

      {/* displaying products in a grid format */}
      <div className="product-grid">
        {searchproducts.map((product) => (
          // renders each product
          <ProductItem
            key={product.id}
            product={product}
            onViewMore={() => gotoviewmore(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
