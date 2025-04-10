import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store';

const ProductList = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ productId: product.id, product }));
  };

  return (
    <div>
      <h2>商品列表</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <span>{product.name} - ${product.price}</span>
            <button
              onClick={() => handleAddToCart(product)}
              style={{ marginLeft: '10px', padding: '5px 10px' }}
            >
              加入购物车
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
