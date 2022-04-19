/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import { getProductById, getAllProducts } from '../../services/api';
import Header from '../../components/Header';
import Gallery from '../../components/Gallery';
import DetailsSkeleton from '../../components/DetailsSkeleton';
import '../../styles/ProductDetail.module.css';

const getAll = async () => {
   const data = await getAllProducts();
   console.log(data);
}

export const getStaticPaths = async () => ({
  paths: [{
    params: {
      id: 1
    },
    params: {
      id: 2
    }
  }],
  fallback: false,
})

const ProductDetail = ({ id }) => {
  const { darkMode } = useContext(AppContext);
  const [hasProduct, setHasProduct] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(productId);
      setProduct(product);
      setHasProduct(true);
      document.title = product.title;
    }

    getProduct();
  }, [setProduct, productId]);


  const addToCart = ({ target }) => {
    const { id } = target;

    const products = [localStorage.getItem('shoppingCart')];
    if (products[0]) {
      const product = [...products, id];
      localStorage.setItem('shoppingCart', product);
    } else {
      localStorage.setItem('shoppingCart', id);
    }
  }
  
  return (
    <>
      <Header />
      <div className={ `product-detail-page container ${darkMode && 'darkmode'}` }>
        {
          !hasProduct
            ? <DetailsSkeleton />
            : (
              <>
                <h2>
                  { product.title }
                </h2>

                <div className="container-flex">
                  <div className="product-image">
                    { product.pictures && <Gallery pictures={ product.pictures } /> }
                  </div>

                  <div className="product-data">
                    <h3>Informações</h3>
                    <p className="price">
                      { product.price && (
                        product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })) }
                    </p>
                    <button
                      type="button"
                      id={ product.id }
                      onClick={ addToCart }
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                </div>
              </>
            )
        }

          {/* <h3>Avaliações do produto</h3>

          <form>
            <input type="text" placeholder="Digite seu email" />

            <div className="rate">
              <label htmlFor="1">
                <span className="material-icons">
                  star_rate
                </span>

                <input type="radio" name="rate" id="1" hidden />
              </label>

              <label htmlFor="2">
                <span className="material-icons">
                  star_rate
                </span>

                <input type="radio" name="rate" id="2" hidden />
              </label>

              <label htmlFor="3">
                <span className="material-icons">
                  star_rate
                </span>

                <input type="radio" name="rate" id="3" hidden />
              </label>

              <label htmlFor="4">
                <span className="material-icons">
                  star_rate
                </span>

                <input type="radio" name="rate" id="4" hidden />
              </label>

              <label htmlFor="5">
                <span className="material-icons">
                  grade
                </span>

                <input type="radio" name="rate" id="5" hidden />
              </label>
            </div>
          </form> */}
      </div>
    </>
  );
}

ProductDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
    PropTypes.bool,
  ])).isRequired,
};

export default ProductDetail;
