import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart} from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const {name,img,seller,price,stock} = props.product;
    return (
        <div className="items-container">
            <div className="img-container">
                <img src={img} alt=""/>
            </div>
            <div className="details-container">
                <h4>{name}</h4>
                <br />
                <p>by {seller}</p>
                <p>$ {price}</p>
                <p>Only {stock} are available - order soon</p>
                <button className="main-button" onClick={() => {props.handleAddCart(props.product)}}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        add to cart
                </button>
            </div>
        </div>
    );
};

export default Product;