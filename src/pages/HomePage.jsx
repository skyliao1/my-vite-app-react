import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');

  // 获取商品列表
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%', padding: '20px' }}>
          <CategoryFilter onCategoryChange={setSelectedCategory} />
          <ProductList
            products={selectedCategory ? products.filter((p) => p.category === selectedCategory) : products}
            addToCart={(productId) => console.log(productId)}
          />
        </div>
        <Cart cartItems={Object.values(cart)} removeFromCart={(productId) => console.log(productId)} />
      </div>
    </div>
  );
};

export default HomePage;
