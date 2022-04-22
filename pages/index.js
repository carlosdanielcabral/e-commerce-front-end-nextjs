import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import AppContext from '../context/AppContext';
import { getProductsByCategory } from '../services/api';
import { getLoggedUser } from '../services/userFunctions';
import Header from '../components/Header';
import ProductSkeleton from '../components/ProductSkeleton';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import { getProductById, getAllProducts } from '../services/api';
import Footer from '../components/Footer';
import styles from '../styles/Index.module.css';

const Principal = () => {
  const [cars, setCars] = useState([]);
  const [smartphones, setSmartphones] = useState([]);
  const [hasProducts, setHasProducts] = useState(false);
  const productsSkeleton = [];

  // useEffect(() => {
  //   const logged = getLoggedUser();
  // //   if (logged) {
  // //     setIsUserLogged(true);
  // //     setLoggedUser(logged);
  // //   } else setIsUserLogged(false);
  // // }, [isUserLogged, setIsUserLogged, setLoggedUser])

  useEffect(() => {
    document.title="Home"
  }, []);

  for (let i = 0; i < 5; i += 1) {
    productsSkeleton.push(<ProductSkeleton key={ `product-skeleton-${i}` }/>);
  }
  
  useEffect(() => {
    const getProducts = async () => {
      const cars = await getProductsByCategory('MLB5672&limit=8');
      const smartphonesData = await getProductsByCategory('MLB1051&limit=8');
      setCars(cars.results);
      setSmartphones(smartphonesData.results);
      setHasProducts(true);
    }
    getProducts();
  }, [setCars, setSmartphones,setHasProducts]);

  return (
    <div className={ styles.principalPage }>
      <Head>
        <title>Home</title>
        <meta name="description" content="Front End básico para um e-commerce" />
        <meta name="keywords" content="HTML, CSS, JavaScript, React, NextJS, Material-UI, Git, GitHub, Front End, desenvolvedor" />
        <meta name="author" content="Carlos Daniel Cabral" />
      </Head>
      <Header />
      <Categories />

      <div className={ styles.principalPageCategories }>
        <div className={ styles.principalPageCategory}>
          <h2>Automoveis</h2>
          {
            hasProducts
              ? <Slider products={ cars } id="automoveis" />
              : (
                <div className={ styles.productsSkeleton }>
                  {productsSkeleton}
                </div>
              )
          }
        </div>

        <div className={ styles.principalPageCategory }>
          <h2>Celulares e telefones</h2>
          {
            hasProducts
              ? <Slider products={ smartphones } id="celulares" />
              : (
                  <div className={ styles.productsSkeleton }>
                    {productsSkeleton}
                  </div>
              )
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Principal;
