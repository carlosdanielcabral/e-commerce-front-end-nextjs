import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import './index.css';

const Filters = () => {
  const { activeFilters, setActiveFilters } = useContext(AppContext);
  const [freeShipping, setFreeShipping] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleClick = (e) => {
    e.preventDefault();

    setActiveFilters({
      category: activeFilters.category,
      query: activeFilters.query,
      othersFilters: {
        freeShipping,
        price: {
          min: minPrice,
          max: maxPrice,
        },
      },
    });
  }

  return (
    <div className="filters-container">
      <h2>Filtros</h2>

      <div className="filters">

      </div>

      <form>
        <label htmlFor="free-shipping">
          Frete grátis
          <input
            id="free-shipping"
            name="freeShipping"
            type="checkbox"
            onChange={ () => setFreeShipping(!freeShipping) }
          />
        </label>

        <label htmlFor="min-price">
          Valor mínimo
          <input
            className="price"
            id="min-price"
            placeholder="Min."
            type="number"
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </label>

        <label htmlFor="max-price">
          Preço máximo
          <input
            className="price"
            id="max-price"
            placeholder="Max."
            type="number"
            onChange={ (e) => setMaxPrice(e.target.value) }
          />
        </label>

        <button
          type="submit"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </form>
    </div>
  )
};

export default Filters;
