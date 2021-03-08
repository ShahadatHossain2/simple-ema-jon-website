import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total,prd) => total+(prd.price*prd.quantity),0);
    //debugger;
    // let totalPrice = 0;
    // cart.forEach(prd => {
    //     totalPrice = totalPrice + prd.price;
    // });
    let shipping = 0;
    if(total > 35) {
        shipping = 0;
    }
    else if(total > 20) {
        shipping = 4.49;
    }
    else if(total > 0) {
        shipping = 12.5;
    }

    const tax = (total /10);

    const formate = (number) => {
        const num = number.toFixed(2);
        return Number(num);
    }

    return (
        <div>
            <h1>Order Summary</h1>
            <p>Item count : {cart.length}</p>
            <p>Product Price : {formate(total)}</p>
            <p>Shipping Cost : {shipping}</p>
            <p>Tax + Vat : {formate(tax)}</p>
            <p>Total : {formate(total)+formate(tax)+shipping}</p>
            {
                props.children
            }

        </div>
    );
};

export default Cart;