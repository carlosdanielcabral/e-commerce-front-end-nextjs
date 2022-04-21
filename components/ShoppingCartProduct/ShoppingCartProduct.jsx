import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BsFillTrashFill } from 'react-icons/bs';
import AppContext from '../../context/AppContext';
import getQuantity from '../../helpers/getQuantity';
import styles from './ShoppingCartProduct.module.css';

const ShoppingCartProduct = (props) => {
  const { id, title, image, price, removeProduct } = props;
  const { total, setTotal } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getQuantity(id)
      .then((data) => setQuantity(data))
      .catch((error) => console.log(`Ocorreu um erro.\nErro: ${error.message}`));
  }, [id, setQuantity]);

  const handleQuantity = (operation) => {
    if (operation === 'decrease') {
      setQuantity(quantity - 1);
      setTotal(total - price);
    }
    else {
      setQuantity(quantity + 1);
      setTotal(total + price);
    }

    if (quantity === 0) removeProduct(id);
  }

  return (
    <div className="product-card shopping-cart-page">
      <div className="image">
        <img src={ image } alt={ title } />
      </div>

      <section className="description">
        <h2 className="title">{ title }</h2>

        <h3 className="price">
          {/* { price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) } */}
        </h3>
      </section>

      <section className="actions">
        <button
          onClick={ () => handleQuantity('decrease') }
          type="button"
        >
          -
        </button>

        <input type="text" value={ quantity } />

        <button
          onClick={ () => handleQuantity('increase') }
          type="button"
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

ShoppingCartProduct.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default ShoppingCartProduct;
