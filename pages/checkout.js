/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/Checkout.module.css';

class CheckoutPage extends React.Component {
  componentDidMount() {
    document.title = 'Finalizar compra';
  }

  render() {
    const { location: { state: { total, products } } } = this.props;
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
                <div key={ product.id } className="product-card">
                  <img src={ product.thumbnail } alt="Product" />
                  <p className="product-title">{ product.title }</p>
                  <p>
                    {
                      product.price.toLocaleString('pr-br', {
                        style: 'currency', currency: 'BRL',
                      })
                    }
                  </p>
                </div>
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
}

CheckoutPage.propTypes = {
  location: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])).isRequired,
};

export default CheckoutPage;
