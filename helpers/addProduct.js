const addProduct = (id) => {
  const products = localStorage.getItem('shopping-cart');
  if (products && products.length > 0) {
    const array = products.split(',');
    array.push(id);
    localStorage.setItem('shopping-cart', array);
  } else {
    localStorage.setItem('shopping-cart', [id]);
  }
}

export default addProduct;
