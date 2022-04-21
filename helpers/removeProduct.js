const removeProduct = (id) => {
  const products = localStorage.getItem('shopping-cart');
  if (products && products.split(',').length > 0) {
    const array = products.split(',');
    array.splice(array.indexOf(id), 1);
    localStorage.setItem('shopping-cart', array);
  }
}

export default removeProduct;
