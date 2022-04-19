import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { Redirect } from 'react-router-dom';
import { getUser, saveLoggedUser } from '../../services/userFunctions';

const LoginForm = () => {
  const { setIsUserLogged } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [invalidAuth, setInvalidAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const authenticateUser = (e) => {
    e.preventDefault();
    const hasUser = getUser(email, password);
    if (hasUser) {
      setRedirect(true);
      setIsUserLogged(true);
      saveLoggedUser(email, password)
    } else setInvalidAuth(true);
  }

  if (redirect) return <Redirect to="/" />;
  return (
    <section className="login">
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
          Cadastrar
        </button>

        {
          invalidAuth && <span>Email ou senha inválidos</span>
        }
      </form>
    </section>
  )
}

export default LoginForm;
