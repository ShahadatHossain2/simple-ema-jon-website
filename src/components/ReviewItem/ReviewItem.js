import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, img, key, price} = props.product;
    const itemReviewStyle = {
        borderBottom: '1px solid lightGray',
        paddingBottom: '5px',
        marginBottom: '5px',
        marginLeft: '200px',
        marginRight: '200px'
    };
    return (
        <div style={itemReviewStyle}>
            <img src={img} alt=""/>
            <h4 style={{color: 'blue'}}>{name}</h4>
            <p>Quantity : {quantity}</p>
            <p>Price : {price}</p>
            <br/>
            <button className="main-button" onClick={() => props.removeItem(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;