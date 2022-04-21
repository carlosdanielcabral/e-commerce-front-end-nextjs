import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import addProduct from '../../helpers/addProduct';
import removeProductFromStorage from '../../helpers/removeProduct';
import { BsFillTrashFill } from 'react-icons/bs';
import AppContext from '../../context/AppContext';
import getQuantity from '../../helpers/getQuantity';
import styles from './ShoppingCartProduct.module.css';

const ShoppingCartProduct = (props) => {
  const { id, title, image, price, removeProduct } = props;
  const { total, setTotal } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [isLessButtonDisable, setIsLessButtonDisable] = useState(false);

  useEffect(() => {
    getQuantity(id)
      .then((data) => setQuantity(data))
      .catch((error) => console.log(`Ocorreu um erro.\nErro: ${error.message}`));
  }, [id, setQuantity]);

  const handleQuantity = (type) => {
    if (type === 'increase') {
      setQuantity(quantity + 1);
      setTotal(total + price);
      addProduct(id);
    } else {
      setQuantity(quantity - 1);
      setTotal(total - price);
      removeProductFromStorage(id);
    }
  }

  return (
    <div className={ styles.productCard }>
      <div className={ styles.productImage }>
        <Image src={ image } alt={ title } layout="fill"/>
      </div>

      <section className={ styles.productDescription }>
        <h2 className={ styles.productTitle }>{ title }</h2>

        <h3 className={ styles.productPrice }>
          {/* { price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) } */}
        </h3>
      </section>

      <section className={ styles.actions }>
        <button
          onClick={ () => handleQuantity('decrease') }
          disabled={ isLessButtonDisable }
          type="button"
        >
          -
        </button>

        <span>{ quantity }</span>

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
