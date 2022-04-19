export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getProductsByQuery(query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductsByCategory(category) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${category}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductById(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getAllProducts() {
  const categories = await getCategories();
  const products = [];
  categories.forEach((category) => products.push(getProductsByCategory(category.id)));
  const data = Promise.all(products)
    .then((product) => console.log(product))
    .catch((err) => console.log(err.message));
  return data;
}
