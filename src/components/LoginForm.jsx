import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { login } from '../store';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });
      const { token } = response.data;
      dispatch(login(token)); // 使用 Redux 更新登录状态
      alert('登录成功');
      navigate('/', { replace: true })
    } catch (error) {
      alert('登录失败，请检查用户名和密码');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>用户名：</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>密码：</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};

export default LoginForm;
