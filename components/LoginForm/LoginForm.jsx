import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { useRouter } from 'next/router';
import { getUser, saveLoggedUser } from '../../services/userFunctions';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const { setIsUserLogged } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [invalidAuth, setInvalidAuth] = useState(false);
  const [password, setPassword] = useState('');

  const router = useRouter();

  const authenticateUser = (e) => {
    e.preventDefault();
    const hasUser = getUser(email, password);
    if (hasUser) {
      setIsUserLogged(true);
      saveLoggedUser(email, password)
      router.push('/authentication/login');
    } else setInvalidAuth(true);
  }

  return (
    <section className={ styles.login }>
      <h2>Login</h2>

      <form>
        <input
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Digite seu email"
          required
          type="email"
          value={ email }
        />

        <input
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Digite sua senha"
          required
          type="password"
          value={ password }
        />

        <button
          onClick={ authenticateUser }
          type="submit"
        >
          Entrar
        </button>

        {
          invalidAuth && <span className={ styles.error }>Email ou senha inválidos</span>
        }
      </form>
    </section>
  )
}

export default LoginForm;
