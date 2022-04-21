import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import Link from 'next/link';
import styles from './ProductCard.module.css';

const ProductCard = ({ id, title, image, price }) => {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={ `${styles.productCard } ${darkMode && 'darkmode'}` }>
      <Link href={ `/products/${id}` }>
        <div>
          <div className={ styles.image }>
            <img src={ image } alt={ title } />
          </div>

          <section className={ styles.description }>
            <h2 className={ styles.title }>
              { title }
            </h2>

            <h3 className={ styles.price }>
              { price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
            </h3>
          </section>

        </div>
      </Link>
      {/* <button
        type="button"
        id={ id }
        onClick={ addToCart }
      >
        Adicionar ao carrinho
      </button> */}
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
