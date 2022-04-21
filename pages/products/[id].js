/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import { getProductById, getAllProducts } from '../../services/api';
import Header from '../../components/Header';
import Gallery from '../../components/Gallery';
import DetailsSkeleton from '../../components/DetailsSkeleton';
import styles from '../../styles/ProductDetail.module.css';

const getAllProductsId = async () => {
  const data = await getAllProducts();
  const allProductsId = [];
  for (let productArray of data) {
    for (let product of productArray) {
      allProductsId.push(product.id);
    }
  }
  return allProductsId;
}

const dataFormat = async () => {
  const products = await getAllProductsId();
  const paths = products.map((product) => ({
    params: {
      id: String(product)
    }
  }))
  return paths;
}

export const getStaticPaths = async () => ({
  paths: await dataFormat(),
  fallback: false,
})

export const getStaticProps = async (context) => ({
  props: {
    id: context.params.id,
  }
})

const ProductDetail = ({ id }) => {
  const { total, setTotal } = useContext(AppContext);
  const [hasProduct, setHasProduct] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(id);
      setProduct(product);
      setHasProduct(true);
      document.title = product.title;
    }

    getProduct();
  }, [setProduct, id]);


  const addToCart = () => {
    const products = [localStorage.getItem('shopping-cart')];
    if (products[0]) {
      const product = [...products, id];
      localStorage.setItem('shopping-cart', product);
    } else {
      localStorage.setItem('shopping-cart', id);
    }
    setTotal(total + product.price);
  }
  
  return (
    <>
      <Header />
      <div className={ `${styles.productDetailPage} container` }>
        {
          !hasProduct
            ? <DetailsSkeleton />
            : (
              <>
                <h2>
                  { product.title }
                </h2>

                <div className="container-flex">
                  <div className={ styles.productImage }>
                    { product.pictures && <Gallery pictures={ product.pictures } /> }
                  </div>

                  <div className={ styles.productData }>
                    <h3>Informações</h3>
                    <p className={ styles.price }>
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
