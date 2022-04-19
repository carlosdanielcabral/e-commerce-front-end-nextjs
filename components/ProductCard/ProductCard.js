import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import Link from 'next/link';
import './ProductCard.module.css';

const ProductCard = ({ id, title, image, price }) => {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={ `product-card ${darkMode && 'darkmode'}` }>
      <Link href={ `/product/${id}` }>
        <div>
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
