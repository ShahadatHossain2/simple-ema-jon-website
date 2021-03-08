import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import HappyImage from '../../images/giphy.gif';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false)
    const removeItem = (productKey) => {
        const newCart = cart.filter(cd => cd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const saveCarts = getDatabaseCart();
        console.log(saveCarts);
        const productKeys = Object.keys(saveCarts)
        const cartProducts =  productKeys.map(key => {
            const products = fakeData.find(pd => pd.key === key);
            products.quantity = saveCarts[key];
            return products;
        })    
        setCart(cartProducts);
    },[])
    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }
    let thankyou;
    if(orderPlace === true) {
        thankyou = <img src={HappyImage} alt=""/>
    }
    const totalItem = cart.reduce((totalItem, item) => totalItem+item.quantity,0)
    return (
       <div className="shop-container">
        <div className="product-container">
            {
                cart.map(pd => <ReviewItem removeItem = {removeItem} key={pd.key} product = {pd}></ReviewItem>)
            }
            {
                thankyou
            }
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handlePlaceOrder} className="main-button">Place order</button>
            </Cart>
        </div>
       </div>
    );
};

export default Review;