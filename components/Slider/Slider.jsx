import React from 'react';
import ProductCard from '../ProductCard';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import './Slider.module.css';

const Slider = ({ products, id }) => {

  const scrollLeft = (e) => {
    const slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft - 200;
  }

  const scrollRight = (e) => {
    const slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft + 200;
  }

  return (
    <div className="slider" id={ id }>
      <div className="buttons">
        <button
          type="button"
          onClick={ scrollRight }
          className="scrollRightButton"
        >
            <AiOutlineCaretRight />
        </button>

        <button
          type="button"
          onClick={ scrollLeft }
          className="scrollLeftButton"
        >
            <AiOutlineCaretLeft />
        </button>
      </div>
      {
        products.map((product) => {
          return (
            <ProductCard
              key={ `home-product-${product.id}` }
              id={ product.id }
              title={ product.title }
              image={ product.thumbnail}
              price={ product.price }
            />
          );
        })
      }
    </div>
  )
} 

export default Slider;
