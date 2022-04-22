import React, { useContext, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useRouter } from 'next/router';
import AppContext from '../../context/AppContext';
import { getProductsByQuery, getProductsFromCategoryAndQuery } from '../../services/api';
import styles from './Search.module.css';

const style = { color: 'rgb(150, 150, 150)', fontSize: '20px' };

const Search = () => {
  const {
    category,
    setHasSearch,
    setProducts,
    query,
    setQuery,
  } = useContext(AppContext);

  const router = useRouter();

  const searchProducts = async (e) => {
    e.preventDefault();
    let data;
    if (category) {
      data = await getProductsFromCategoryAndQuery(category, query);
    } else {
      data = await getProductsByQuery(query);
    }
    setProducts(data.results);
    setHasSearch(true);
    router.push('/search')
  }

  return (
    <div className={ styles.search }>
      <form>
        <div className={ styles.inputButtonContainer }>
          <input
            type="text"
            value={ query }
            name="inputValue"
            placeholder="Digite aqui"
            onChange={ (e) => setQuery(e.target.value) }
          />

          <button
            type="submit"
            onClick={ searchProducts }
            aria-label="pesquisar"
          >
            <BsSearch style={ style } className={ styles.searchIcon } />
          </button>
        </div>
        {/* <button
          type="button"
          onClick={ clearResults }
          className="clear-results"
        >
          Limpar
        </button> */}
      </form>
      {/* <h2 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h2> */}
    </div>
  );
}

export default Search;
