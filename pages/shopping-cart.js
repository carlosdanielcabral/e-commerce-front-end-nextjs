import React from 'react';
import { Redirect } from 'react-router-dom';
import { getProductById } from '../services/api';
import ShoppingCartProduct from '../components/ShoppingCartProduct';
import Header from '../components/Header';
import '../styles/ShoppingCart.module.css';

class ShoppingCart extends React.Component {
  constructor() {
    super();

    this.getProducts = this.getProducts.bind(this);

    this.state = {
      products: [],
      quantity: 1,
      total: 0,
      redirect: false,
    };
  }

  componentDidMount() {
    this.getProducts();
    document.title = 'Meu carrinho';
  }

  async getProducts() {
    let products = localStorage.getItem('shoppingCart');
    if (products !== null && products.length > 0) {
      products = products.split(',');
      const productsList = [...new Set(products)];
      for (let i = 0; i < productsList.length; i += 1) {
        getProductById(productsList[i]).then((data) => {
          const { length } = products.filter((product) => product === data.id);
          this.setState((prevState) => {
            this.setState({
              products: [...prevState.products, data],
              total: prevState.total + (data.price * length),
            });
          });
        });
      }
    }
  }

  checkout = () => this.setState({ redirect: true });

  getQuantity = (id) => {
    const products = localStorage.getItem('shoppingCart').split(',');
    const productsById = products.filter((product) => product === id);
    this.setState({ quantity: productsById.length });
    return productsById.length;
  }

  decreaseQuantity = ({ target: { id } }) => {
    const { quantity } = this.state;
    if (quantity > 0) {
      const products = localStorage.getItem('shoppingCart').split(',');
      const index = products.indexOf(id);
      products.splice(index, 1);
      localStorage.setItem('shoppingCart', [...products]);
      this.getQuantity(id);
      this.setState((prevState) => {
        const { price } = prevState.products.find((product) => product.id === id);
        this.setState({ total: prevState.total - price });
      });
    }
  }

  increaseQuantity = ({ target: { id } }) => {
    const products = localStorage.getItem('shoppingCart').split(',');
    localStorage.setItem('shoppingCart', [...products, id]);
    this.getQuantity(id);

    this.setState((prevState) => {
      const { price } = prevState.products.find((product) => product.id === id);
      this.setState({ total: prevState.total + price });
    });
  }

  removeProduct = (id) => {
    const productsList = localStorage.getItem('shoppingCart').split(',');
    const productTotal = this.getQuantity(id);
    const newProductsList = productsList.filter((product) => product !== id);
    localStorage.setItem('shoppingCart', newProductsList);
    this.setState((prevState) => {
      const { products } = prevState;
      const newProducts = products.filter((product) => product.id !== id);
      const product = products.find((productData) => productData.id === id);
      this.setState({
        products: newProducts,
        total: prevState.total - (productTotal * product.price),
      });
    });
  }

  render() {
    const { products, quantity, total, redirect } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={ {
            pathname: '/checkout',
            state: { products, total },
          } }
        />
      );
    }
    return (
      <div className="shopping-cart-page">
        <Header />
        <div className="container">
          <h2>Meu Carrinho</h2>
          { products.length > 0 && (
            <div className="purchase-data">
              <h3>
                { 'Total: ' }
                {
                  total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                }
              </h3>

              <button
                className="checkout"
                onClick={ this.checkout }
                type="button"
              >
                Finalizar compra
              </button>
            </div>
          )}
          { products.length > 0
            ? products.map((product) => (
              <ShoppingCartProduct
                key={ product.id }
                id={ product.id }
                title={ product.title }
                image={ product.thumbnail }
                price={ product.price }
                removeProduct={ this.removeProduct }
                quantity={ quantity }
                getQuantity={ this.getQuantity }
                increaseQuantity={ this.increaseQuantity }
                decreaseQuantity={ this.decreaseQuantity }
              />
            ))
            : 'Ainda não há nenhum produto no carrinho' }
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
