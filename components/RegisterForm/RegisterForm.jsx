import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { Redirect } from 'react-router-dom';
import { getUser, saveUser, saveLoggedUser } from '../../services/userFunctions';
// l

const RegisterForm = () => {
  const { setIsUserLogged } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [userAlreadyRegister, setUserAlreadyRegister] = useState(false);

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
      setRedirect(true);
      setIsUserLogged(true);
      saveLoggedUser(email, password);
    } else {
      if (user) setUserAlreadyRegister(true);
    }
  }

  if (redirect) return <Redirect to="/" />;
  return (
    <section className="register">
    <h2>Cadastro</h2>

    <form>
      <input
        onChange={ (e) => setName(e.target.value) }
        placeholder="Digite seu nome"
        type="text"
        value={ name }
      />

      { invalidName && <span className='error'>Nome inválido! Digite pelo menos 3 caracteres</span> }

      <input
        onChange={ (e) => setEmail(e.target.value) }
        placeholder="Digite seu email"
        type="email"
        value={ email }
      />

      { invalidEmail && <span className='error'>Email inválido!</span> }

      <input
        onChange={ (e) => setPassword(e.target.value) }
        type="password"
        placeholder="Digite sua senha"
        value={ password }
      />

      { invalidPassword && <span className='error'>Senha inválida! Digite pelo menos 6 caracteres.</span> }

      <button
        onClick={ handleSubmit }
        type="submit"
      >
        Cadastrar
      </button>

      { userAlreadyRegister && <span className='error'>Email já cadastrado!</span> }
    </form>
  </section>
  )
}

export default RegisterForm;
