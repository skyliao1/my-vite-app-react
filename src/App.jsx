import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  

  // 登录处理
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 登出处理
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        {/* <Navbar cartCount={Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)} /> */}
        <Routes>
          {/* 首页 */}
          <Route
            path="/"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
          />

          {/* 登录页面 */}
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />

          {/* 注册页面 */}
          <Route
            path="/register"
            element={<RegisterPage />}
          />

          {/* 默认重定向到首页 */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
