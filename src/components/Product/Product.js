import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name,img,seller,price,stock,key} = props.product;
    return (
        <div className="items-container">
            <div className="img-container">
                <img src={img} alt=""/>
            </div>
            <div className="details-container">
             <h4><Link to={"/product/"+key}>{name}</Link></h4>
                <br />
                <p>by {seller}</p>
                <p>$ {price}</p>
                <p>Only {stock} are available - order soon</p>
               { props.addToCart!==false && <button className="main-button" onClick={() => {props.handleAddCart(props.product)}}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;