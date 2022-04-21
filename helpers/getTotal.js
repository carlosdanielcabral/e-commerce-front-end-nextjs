import getProducts from './getProducts';
import getQuantity from './getQuantity';

const getTotal = async () => {
  const products = await getProducts();
  const productsPromises = products.map((product) => getQuantity(product.id));
  const productsQuantity = await Promise.all(productsPromises);
  const totalPrice = products.reduce((acc, product, index) => {
    return acc + (product.price * productsQuantity[index]);
  }, 0)
  return totalPrice;
}

export default getTotal;
