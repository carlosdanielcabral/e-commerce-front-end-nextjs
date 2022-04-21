import { getProductById } from '../services/api';

const getProducts = async () => {
  const localStorageIds = localStorage.getItem('shopping-cart');

  // Verifica se há items salvos no storage.
  if (localStorageIds !== null && localStorageIds.length > 0) { 
    // Transforma a string localStorageIds em array e retira items repetidos.
    const productsId = [...new Set(localStorageIds.split(','))];
    const productsPromises = [];
    
    productsId.forEach((id) => {
      const productData = getProductById(id);
      productsPromises.push(productData);
    });

    const products = await Promise.all(productsPromises);
    return products;
  }
  return null;
}

export default getProducts;
