import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartCount = useSelector((state) => {
    
    return Object.values(state.cart).reduce((sum, item) => sum + item.quantity, 0)
  });
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav style={{ backgroundColor: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
      <h1>我的商城</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Link to="/" style={{ color: '#fff' }}>首页</Link>
        {!isLoggedIn && <Link to="/login" style={{ color: '#fff' }}>登录</Link>}
        {!isLoggedIn && <Link to="/register" style={{ color: '#fff' }}>注册</Link>}
        {isLoggedIn && <button onClick={handleLogout} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>登出</button>}
      </div>
      {isLoggedIn && (
        <span style={{ position: 'absolute', right: '20px', top: '20px', fontSize: '18px' }}>
          🛒 购物车 ({cartCount})
        </span>
      )}
    </nav>
  );
};

export default Navbar;
