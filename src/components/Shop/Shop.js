import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'
import { Link } from 'react-router-dom';
const Shop = () => {
    const [products, setProduct] = useState(fakeData);
    const [cart, setCart] = useState([]);
    const handleAddCart = (product) => {
        const pdkey = product.key;
        const sameProduct = cart.find(pd => pd.key === pdkey);
        console.log(sameProduct);
        let count = 1;
        let newCart;
        if(sameProduct) {
            count = sameProduct.quantity + 1;
            console.log(count);
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== pdkey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart);
        const previousCart = productkeys.map(existingKey => {
            const cartData = fakeData.find(pd => pd.key === existingKey);
            cartData.quantity = savedCart[existingKey];
            return cartData;
        })
        setCart(previousCart);
    },[])
    
    return (
        <div className="shop-container">
            <div className="product-container">
                {products.map(pd =>
                <Product key = {pd.key} product={pd} handleAddCart = {handleAddCart}>

                </Product>)}
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                   <Link to="/review"><button className="main-button">view cart</button></Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;