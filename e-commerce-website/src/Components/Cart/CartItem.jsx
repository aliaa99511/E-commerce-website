import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartItem = ({ item, RemoveItem, UpdateQuantity }) => {

    return (
        <>
            <div key={item._id} className="cartItem d-flex align-items-center">
                <img src={item.product.imageCover} alt={item.product.title} className="img-thumbnail" />
                <div className="ms-3">
                    <h5>{item.product.title}</h5>
                    <p>price : {item.price} EGP</p>
                    <button className="btn btn-danger btn-sm" onClick={() => RemoveItem(item.product._id)}>Remove</button>
                </div>
                <div className="ms-auto d-flex align-items-center">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => UpdateQuantity(item.product._id, item.count - 1)} disabled={item.count <= 1}>-</button>
                    <div className="mx-2 count">{item.count}</div>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => UpdateQuantity(item.product._id, item.count + 1)}>+</button>
                </div>
            </div>
            <hr />
        </>
    );
};

export default CartItem;
