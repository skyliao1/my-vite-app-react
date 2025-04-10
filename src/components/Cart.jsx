import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store';

const Cart = () => {
  const cartItems = useSelector((state) => Object.values(state.cart));
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ width: '30%', padding: '20px', borderLeft: '1px solid #ccc' }}>
      <h2>购物车</h2>
      {cartItems.length === 0 ? (
        <p>购物车为空</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cartItems.map((item) => (
            <li key={item.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
              <span>
                {item.name} x {item.quantity} - ${item.price * item.quantity}
              </span>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                style={{ marginLeft: '10px', padding: '5px 10px' }}
              >
                移除
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>总价: ${totalPrice}</h3>
    </div>
  );
};

export default Cart;
