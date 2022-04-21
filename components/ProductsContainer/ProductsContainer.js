import React from "react";
import PropTypes from "prop-types";
import ProductCard from "../ProductCard";
import styles from "./ProductsContainer.module.css";

const ProductsContainer = ({ products }) => (
  <div className={ styles.productsContainer }>
    {products.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        title={product.title}
        image={product.thumbnail}
        price={product.price}
      />
    ))}
  </div>
);

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array,
  ])).isRequired,
}

export default ProductsContainer;
