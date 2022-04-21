const getQuantity = async (id) => {
  const products = localStorage.getItem('shopping-cart');
  if (products && products.length > 0) {
    const quantity = products.split(',').reduce((acc, cur) => {
      if (cur === id) return acc + 1;
      return acc + 0;
    }, 0);
    return quantity;
  }
  return null;
}

export default getQuantity;
