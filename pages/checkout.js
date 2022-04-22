/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import getProducts from '../helpers/getProducts';
import getTotal from '../helpers/getTotal';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import styles from '../styles/Checkout.module.css';

const CheckoutPage = () => {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cepErro, setCepErro] = useState(false);

  useEffect(() => {
    document.title="Meu carrinho"
  }, []);

  useEffect(() => {
    const getProductsFromStorage = async () => {
      const response = await getProducts();
      setProducts(response);
      const totalPrice = await getTotal();
      setTotal(totalPrice);
    }
    getProductsFromStorage();
  }, [setProducts, setTotal])

  const requireCep = async (cep) => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((data) => data.json())
      .then((data) => {
        setCity(data.localidade);
        setState(data.uf);
        if (data.erro) setCepErro(true);
      })
      .catch((error) => console.log(`Ocorreu um erro ao valida o CEP.\nErro: ${error.message}`))
  }

  const handleCep = ({ target: { value } }) => {
    setCep(value);
    if (value.length === 8) {
      requireCep(value);
    }
  }

  if (products.length === 0) return '';
    return (
      <div className={ styles.checkoutPage }>
        <Header />
        <div className="container">
          <h2>Resumo da compra:</h2>
          <h3 className={ styles.total }>
            Total:
            { total.toLocaleString('pr-br', { style: 'currency', currency: 'BRL' }) }
          </h3>
          <div className={ styles.purchaseSummary }>
            {
              products.map((product) => (
                <ProductCard
                  key={ product.id }
                  image={ product.thumbnail }
                  title={ product.title }
                  price={ product.price }
                />
              ))
            }
          </div>

          <form className={styles.checkoutForm }>
            <fieldset>
              <legend>Insira suas informações</legend>
              <div className={ styles.line }>
                <label htmlFor="full-name">
                  Nome completo
                  <input type="text" placeholder="Digite aqui" id="full-name" />
                </label>

                <label htmlFor="email">
                  Email
                  <input type="email" placeholder="Digite aqui" id="email" />
                </label>
              </div>

            <div className={ styles.line }>
              <label htmlFor="cpf">
                CPF
                <input type="text" placeholder="Digite aqui" id="cpf" />
              </label>
            </div>

            <div className={ styles.line }>
              <div>
                <label htmlFor="cep">
                  CEP
                  <input
                    type="number"
                    placeholder="Digite aqui"
                    id="cep"
                    value={ cep }
                    onChange={ handleCep }
                  />
                </label>

                { cepErro && <span className={ styles.error }> Digite um CEP válido!</span> }
              </div>

              <label htmlFor="city">
                Cidade
                <input
                  type="text"
                  placeholder="Digite aqui"
                  id="city"
                  value={ city }
                  onChange={ (e) => setCity(e.target.value) }
                />
              </label>
            </div>
            <div className={ styles.line }>
              <label htmlFor="state">
                Estado
                <input
                  type="text"
                  placeholder="Digite aqui"
                  id="state"
                  value={ state }
                  onChange={ (e) => setState(e.target.value) }
                />
              </label>
            </div>

              {/* <label htmlFor="card">
                <input type="radio" id="card" />
                <span className="material-icons">
                  payment
                </span>
              </label> */}
            </fieldset>
          </form>
        </div>
      </div>
    );
}


export default CheckoutPage;
