import React from 'react';
import ProductCard from '../ProductCard';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import styles from './Slider.module.css';

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
    <div className={ styles.container }>
      <div className={ styles.sliderPrincipalPage } id={ id }>
        <div className={ styles.buttons }>
          <button
            type="button"
            onClick={ scrollRight }
            className={ styles.scrollRightButton }
          >
              <AiOutlineCaretRight />
          </button>

          <button
            type="button"
            onClick={ scrollLeft }
            className={ styles.scrollLeftButton }
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
    </div>
  )
} 

export default Slider;
