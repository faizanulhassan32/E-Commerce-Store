import React, { useState } from "react";
import './App.css';
import ProductsList from './ProductList';

const Cart = () => {

    // for navigating to mainpage
    const [selectedmain, setSelectedmain] = useState(null);

    // getting items from the local storage
    const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    
    // getting distinct number of purchases in local storage
    const distinctPurchases = new Set(purchases);    
    const numDistinctPurchases = distinctPurchases.size;
    
    // calculating price 
    const Price = JSON.parse(localStorage.getItem('totalPrice'));
    const est = 6.95;
    const total = (Price + est).toFixed(2);

    

    // for navigating to the main component
    const continueshopping = () => {
        setSelectedmain(true);
    };

    // function to clear local storage and reload page
    const checkout = () => {
        localStorage.clear();
        window.location.reload();
    };

    // Render the cart in a new component
    if (selectedmain) {
        return <ProductsList />;
    }

    return (
        <div className='cart'>
            <h2>Order Summary</h2>
            <div>Total Purchases: {numDistinctPurchases}</div>
            <div>Sub Total: ${Price}</div>
            <div>Est. Shipping : ${est}</div>
            <div>Total : ${total}</div>
            <br/><br/><br/><br/>
            {purchases.map((purchase, index) => (
              <div key={index}>
                <p>Title: {purchase.title}</p>
                <p>Quantity: {purchase.quantity}</p>
              </div>
            ))}
            <button className="add-to-cart" onClick={continueshopping}>
                Continue Shopping
            </button>
            <button className="add-to-cart" onClick={checkout}>
                Checkout
            </button>
        </div>
    );
};

export default Cart;
