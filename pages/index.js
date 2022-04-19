import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { getProductsByCategory } from '../services/api';
import { getLoggedUser } from '../services/userFunctions';
import Header from '../components/Header';
import ProductSkeleton from '../components/ProductSkeleton';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import { getProductById, getAllProducts } from '../services/api';
import Footer from '../components/Footer';
import '../styles/Index.module.css';


const getAll = async () => {
  const data = await getAllProducts();
  const allProductsId = [];
  for (let productArray of data) {
    for (let product of productArray) {
      allProductsId.push(product.id);
    }
  }
  return allProductsId;
}

getAll();

const Principal = () => {
  const { darkMode, isUserLogged, setLoggedUser, setIsUserLogged } = useContext(AppContext);
  const [cars, setCars] = useState([]);
  const [animals, setAnimals] = useState([]);
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
      const cars = await getProductsByCategory('MLB5672');
      const animals = await getProductsByCategory('MLB1071');
      const smartphonesData = await getProductsByCategory('MLB1051');
      setCars(cars.results);
      setAnimals(animals.results);
      setSmartphones(smartphonesData.results);
      setHasProducts(true);
    }
    getProducts();
  }, [setCars, setAnimals, setSmartphones,setHasProducts]);

  return (
    <div className={ `principal-page ${darkMode && 'darkmode'}`}>
      <Header />
      <Categories />

      <div className="principal-page-categories">
        <div className="principal-page-category cars">
          <h2>Automoveis</h2>
          {
            hasProducts
              ? <Slider products={ cars } id="automoveis" />
              : (
                <div className="products-skeleton">
                  {productsSkeleton}
                </div>
              )
          }
        </div>

        <div className="principal-page-category personal-care">
          <h2>Animais</h2>
          {
            hasProducts
              ? <Slider products={ animals } id="animais" />
              : (
                  <div className="products-skeleton">
                    {productsSkeleton}
                  </div>
              )
          }
        </div>

        <div className="principal-page-category smartphones">
          <h2>Celulares e telefones</h2>
          {
            hasProducts
              ? <Slider products={ smartphones } id="celulares" />
              : (
                  <div className="products-skeleton">
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
