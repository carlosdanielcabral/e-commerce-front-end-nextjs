import React from 'react';
import { Redirect } from 'react-router';
import './CartIcon.module.css';

class CartIcon extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
    };
  }

  redirect = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    return (
      <>
        <button
          className="cart-icon"
          type="button"
          onClick={ this.redirect }
        >
          <h2 className="material-icons">shopping_cart</h2>
        </button>
        {
          redirect && <Redirect to="/shopping-cart" />
        }
      </>
    );
  }
}

export default CartIcon;
