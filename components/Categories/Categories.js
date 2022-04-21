import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppContext from '../../context/AppContext';
import { getCategories, getProductsByCategory,
  getProductsFromCategoryAndQuery } from '../../services/api';
import styles from './Categories.module.css';

const Categories = () => {
  const {
    setProducts,
    setHasSearch,
    query,
    category,
    setCategory,
    darkMode,
  } = useContext(AppContext);

  const [categories, setCategories] = useState([]);

  const { pathname, push } = useRouter();

  useEffect(() => {
    const getCategory = async () => {
      const categoryList = await getCategories();
      setCategories(categoryList);
    };

    getCategory();
  }, [setCategories]);

  const selectCategory = async (e) => {
    e.preventDefault();
    setCategory(e.target.id);
    let data ;
    if (query) {
      data = await getProductsFromCategoryAndQuery(e.target.id, query);
    } else {
      data = await getProductsByCategory(e.target.id);
    }
    setProducts(data.results);
    setHasSearch(true);
  }

  return (
    <aside className={ `${styles.categories} ${!pathname.includes('search') && styles.categoriesHome}`}>
      {
        categories.map(({ name, id }) => (
          pathname.includes('search')
            ? (
              <button
                type="button"
                key={ id }
                data-testid="category"
                className={ `${styles.category} ${category === id && 'selected'}` }
                id={ id }
                onClick={ selectCategory }
              >
                {name}
              </button>
            )
            : (
              <button
                type="button"
                key={ id }
                data-testid="category"
                className={ `${styles.category} ${category === id && 'selected'}` }
                id={ id }
                onClick={ (e) => {
                  selectCategory(e) 
                  push('/search')
                } }
              >
                {name}
              </button>
            )
        ))
      }
    </aside>
  );
}

export default Categories;
