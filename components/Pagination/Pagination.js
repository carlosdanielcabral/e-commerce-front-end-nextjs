import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import ProductsContainer from '../ProductsContainer';
import styles from './Pagination.module.css';

const Pagination = () => {
  const { products } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = Math.ceil(products.length / 12);
  const buttons = [];
  
  for (let i = 0; i < numberOfPages; i += 1) {
    buttons.push(i + 1);
    // console.log(buttons);
  }

  const startIndex = (currentPage - 1) * 12;

  let currentProducts = products.slice(startIndex,  startIndex + 12);

  const selectPage = ({ target: { id } }) => {
    setCurrentPage(Number(id));
    console.log(currentPage, id)
  }

  return (
    <>
      <ProductsContainer products={ currentProducts } />
      <section className={ styles.pages }>
        {
          buttons.map((button) => (
            <button
              type="button"
              className={ currentPage == button ? styles.selected : '' }
              id={ button }
              key={ `page${button}` }
              onClick={ selectPage }
            >
              { button }
            </button>
          ))
        }
      </section>
    </>
  );
}

export default Pagination;
