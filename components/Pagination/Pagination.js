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
    setCurrentPage(Number(id.substring(5)));
    const selected = document.querySelector('.page-selected');
    if (selected) selected.classList.remove('page-selected')
    const element = document.getElementById(id);
    element.classList.add('page-selected');
  }

  return (
    <>
      <ProductsContainer products={ currentProducts } />
      <section className="pages">
        {
          buttons.map((button) => (
            <button
              type="button"
              className={ button === 1 && currentPage === 1 ? 'page-selected' : '' }
              id={ `page-${button}` }
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
