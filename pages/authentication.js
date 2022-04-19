import React from 'react';
import { useParams }  from 'react-router-dom';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import '../styles/Authentication.module.css';

const Authentication = () => {
  const { action } = useParams();
  return (
    <>
      <Header />
      <div className="authentication-page">
        <div className="right">
          { action === 'register' ? <RegisterForm /> : <LoginForm /> }
        </div>

        <div className="left">
          {/* <img src={ background } alt="background" /> */}
        </div>
      </div>
    </>
  );
};

export default Authentication;
