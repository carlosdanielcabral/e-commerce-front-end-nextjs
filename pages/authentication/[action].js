import React from 'react';
import { useRouter }  from 'next/router';
import Header from '../../components/Header';
import RegisterForm from '../../components/RegisterForm';
import LoginForm from '../../components/LoginForm';
import styles from '../../styles/Authentication.module.css';

export const getStaticPaths = async () => ({
  paths: [
    { params: { action: 'register' } },
    { params: { action: 'login' } },
  ],
  fallback: false,
})

export const getStaticProps = async (context) => ({
  props: {
    action: context.params.action
  }
})

const Authentication = ({ action }) => {
  console.log(action)
  return (
    <>
      <Header />
      <div className={ styles.authenticationPage }>
        <div className={ styles.right }>
          { action === 'register' ? <RegisterForm /> : <LoginForm /> }
        </div>

        <div className={ styles.left }>
          {/* <img src={ background } alt="background" /> */}
        </div>
      </div>
    </>
  );
};

export default Authentication;
