const ENDPOINTS = {
  categories: 'https://api.mercadolibre.com/sites/MLB/categories',
  products: {
    byCategory: (category) =>
      `https://api.mercadolibre.com/sites/MLB/search?category=${category}`,
    byQuery: (query) =>
      `https://api.mercadolibre.com/sites/MLB/search?q=${query}`,
    byCategoryAndQuery: (category, query) => 
      `https://api.mercadolibre.com/sites/MLB/search?category=${category}&q=${query}`,
  }
};

export default ENDPOINTS;
