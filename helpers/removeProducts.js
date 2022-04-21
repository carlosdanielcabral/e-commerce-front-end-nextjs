import getProducts from './getProducts'

const removeProductsFromStorage = async (id) => {
  const previousProducts = await getProducts();
  if (previousProducts.length === 1) {
    localStorage.removeItem('shopping-cart');
  } else {
    const newProducts = previousProducts.filter((product) => product !== id);
    localStorage.setItem('shopping-cart', newProducts);
  }
}

export default removeProductsFromStorage;
