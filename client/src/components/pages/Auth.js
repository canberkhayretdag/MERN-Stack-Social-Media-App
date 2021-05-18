import React, { useState } from 'react';
import LoginForm from '../ui/LoginForm'
import RegisterForm from '../ui/RegisterForm'

const Auth = ({ onLogin, onRegister }) => {

  const [authPage, setauthPage] = useState(0);


  const handleChange = () => {
    if (authPage == 0) {
      setauthPage(1)
    } else {
      setauthPage(0)
    }
  }


  switch (authPage) {
    case 0:
      return <LoginForm onLogin={onLogin} handleChange={handleChange} />;
    case 1:
      return <RegisterForm handleChange={handleChange} onRegister={onRegister} />;
    default:
      return null;
  }
}

export default Auth
