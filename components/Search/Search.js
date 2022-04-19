import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import AppContext from '../../context/AppContext';
import { getProductsByQuery, getProductsFromCategoryAndQuery } from '../../services/api';
import './Search.module.css';

const style = { color: 'rgb(150, 150, 150)', fontSize: '20px' };

const Search = () => {
  const {
    category,
    setHasSearch,
    setProducts,
    query,
    setQuery,
  } = useContext(AppContext);

  const [redirect, setRedirect] = useState(false);

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
    setRedirect(true);
  }

  return (
    <div className="search">
      <form>
        <div className="input-button-container">
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
          >
            <BsSearch style={ style } className="search-icon" />
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
      { redirect && <Redirect to="/search-products" /> }
      {/* <h2 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h2> */}
    </div>
  );
}

export default Search;
