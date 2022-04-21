import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { useRouter } from 'next/router';
import { getUser, saveUser, saveLoggedUser } from '../../services/userFunctions';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const { setIsUserLogged } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userAlreadyRegister, setUserAlreadyRegister] = useState(false);

  const router = useRouter();

  const validateInputs = () => {
    const validEmailRgx =  /\w+@\w+.com/i;
    const validEmail = validEmailRgx.test(email);
    setInvalidEmail(!validEmail);
    const validName = name.length > 2;
    setInvalidName(!validName)
    const validPassword = password.length > 5;
    setInvalidPassword(!validPassword);
    return (validEmail && validName && validPassword);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateInputs();
    const user = getUser(email, password);
    if (valid && !user) {
      saveUser(name, email, password);
      setIsUserLogged(true);
      saveLoggedUser(email, password);
      router.push('/');
    } else {
      if (user) setUserAlreadyRegister(true);
    }
  }

  return (
    <section className={ styles.register }>
    <h2>Cadastro</h2>

    <form>
      <input
        onChange={ (e) => setName(e.target.value) }
        placeholder="Digite seu nome"
        type="text"
        value={ name }
      />

      { invalidName && (
        <span className={ styles.error }>
          Nome inválido! Digite pelo menos 3 caracteres
        </span> 
      )}

      <input
        onChange={ (e) => setEmail(e.target.value) }
        placeholder="Digite seu email"
        type="email"
        value={ email }
      />

      { invalidEmail && <span className={ styles.error }>Email inválido!</span> }

      <input
        onChange={ (e) => setPassword(e.target.value) }
        type="password"
        placeholder="Digite sua senha"
        value={ password }
      />

      { invalidPassword && (
        <span className={ styles.error }>
          Senha inválida! Digite pelo menos 6 caracteres.
        </span>
      )}

      <button
        onClick={ handleSubmit }
        type="submit"
      >
        Cadastrar
      </button>

      { userAlreadyRegister && <span className={ styles.error }>Email já cadastrado!</span> }
    </form>
  </section>
  )
}

export default RegisterForm;
