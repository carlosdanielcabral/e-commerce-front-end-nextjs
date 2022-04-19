import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import './index.css';

class ShoppingCartProduct extends React.Component {
  componentDidMount() {
    const { id, getQuantity } = this.props;
    getQuantity(id);
  }

  render() {
    const { id, title, image, price, removeProduct, quantity, increaseQuantity,
      decreaseQuantity } = this.props;

    return (
      <div className="product-card shopping-cart-page">
        <div className="image">
          <img src={ image } alt={ title } />
        </div>

        <section className="description">
          <h2 className="title">
            { title }
          </h2>

          <h3 className="price">
            { price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
          </h3>
        </section>
        <section className="actions">
          <button
            onClick={ decreaseQuantity }
            type="button"
            id={ id }
          >
            -
          </button>

          <input type="text" value={ quantity } />

          <button
            onClick={ increaseQuantity }
            type="button"
            id={ id }
          >
            +
          </button>

          <button
            onClick={ () => removeProduct(id) }
            type="button"
            id={ id }
            className="remove-product-button"
          >
            <BsFillTrashFill />
          </button>
        </section>
      </div>
    );
  }
}

ShoppingCartProduct.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  removeProduct: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  getQuantity: PropTypes.func.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
};

export default ShoppingCartProduct;
