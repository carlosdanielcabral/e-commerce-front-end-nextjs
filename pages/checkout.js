/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import getProducts from '../helpers/getProducts';
import getTotal from '../helpers/getTotal';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import '../styles/Checkout.module.css';

const CheckoutPage = () => {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsFromStorage = async () => {
      const response = await getProducts();
      setProducts(response);
      const totalPrice = await getTotal();
      setTotal(totalPrice);
    }
    getProductsFromStorage();
  }, [setProducts, setTotal])

  if (products.length === 0) return '';
    return (
      <div className="checkout-page">
        <Header />
        <div className="container">
          <h2>Resumo da compra:</h2>
          <h3 className="total">
            Total:
            { total.toLocaleString('pr-br', { style: 'currency', currency: 'BRL' }) }
          </h3>
          <div className="purchase-summary">
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

          <form className="checkout-form">
            <fieldset>
              <legend>Insira suas informações</legend>
              <label htmlFor="full-name">
                Nome completo
                <input type="text" placeholder="Digite aqui" id="full-name" />
              </label>

              <label htmlFor="email">
                Email
                <input type="email" placeholder="Digite aqui" id="email" />
              </label>

              <label htmlFor="cpf">
                CPF
                <input type="text" placeholder="Digite aqui" id="cpf" />
              </label>

              <label htmlFor="adress">
                Endereço
                <input type="text" placeholder="Digite aqui" id="adress" />
              </label>

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
