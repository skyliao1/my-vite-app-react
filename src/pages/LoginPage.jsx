import React from 'react';
import LoginForm from '../components/LoginForm';



const LoginPage = ({ onLogin }) => {
  
  const login=()=>{
    onLogin()
    
  }
  return (
    <div>
      <h2>登录</h2>
      <LoginForm onLogin={login} />
    </div>
  );
};

export default LoginPage;
