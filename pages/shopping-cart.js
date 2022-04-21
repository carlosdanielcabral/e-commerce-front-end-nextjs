import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppContext from '../context/AppContext';
import getProducts from '../helpers/getProducts';
import removeProductsFromStorage from '../helpers/removeProducts';
import ShoppingCartProduct from '../components/ShoppingCartProduct';
import Header from '../components/Header';
import styles from '../styles/ShoppingCart.module.css';

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const { total, setTotal } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    const getCartProducts = async () => {
      const response = await getProducts();
      if (response) setProducts(response);
    }

    getCartProducts();

  }, [setProducts]);

  const removeProduct = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    removeProductsFromStorage(id);
  }
      
  return (
    <> 
      <Header />
      <div className={ styles.shoppingCartPage }>
        <div className={ styles.container }>
          <h2>Meu Carrinho</h2>

          { products.length > 0 && (
            <div className={ styles.purchaseData }>
              <h3>
                { 'Total: ' }
                {
                  total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                }
              </h3>

              <button
                className={ styles.checkout }
                onClick={ () => router.push('/checkout') }
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
                removeProduct={ removeProduct }
              />
            ))
            : 'Ainda não há nenhum produto no carrinho' }
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
