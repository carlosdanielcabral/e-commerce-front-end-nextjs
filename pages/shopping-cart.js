import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppContext from '../context/AppContext';
import getProducts from '../helpers/getProducts';
import removeProductsFromStorage from '../helpers/removeProducts';
import ShoppingCartProduct from '../components/ShoppingCartProduct';
import Header from '../components/Header';
import styles from '../styles/ShoppingCart.module.css';

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const { total, setTotal } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    const getCartProducts = async () => {
      const response = await getProducts();
      if (response) setProducts(response);
    }

    getCartProducts();

  }, [setProducts]);

  const removeProduct = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    removeProductsFromStorage(id);
  }
      
  return (
    <> 
      <Header />
      <div className={ styles.shoppingCartPage }>
        <div className="container">
          <h2>Meu Carrinho</h2>

          { products.length > 0 && (
            <div className="purchase-data">
              <h3>
                { 'Total: ' }
                {
                  total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                }
              </h3>

              <button
                className="checkout"
                onClick={ () => router.push('/checkout') }
                type="button"
              >
                Finalizar compra
              </button>
            </div>
          )}

          { products.length > 0
            ? products.map((product) => (
              <ShoppingCartProduct
                key={ product.id }
                id={ product.id }
                title={ product.title }
                image={ product.thumbnail }
                price={ product.price }
                removeProduct={ removeProduct }
              />
            ))
            : 'Ainda não há nenhum produto no carrinho' }
        </div>
      </div>
    </>
  );
}

// class ShoppingCart extends React.Component {
//   constructor() {
//     super();

//     this.getProducts = this.getProducts.bind(this);

//     this.state = {
//       products: [],
//       quantity: 1,
//       total: 0,
//       redirect: false,
//     };
//   }

//   componentDidMount() {
//     this.getProducts();
//     document.title = 'Meu carrinho';
//   }

  

//   checkout = () => this.setState({ redirect: true });

//   getQuantity = (id) => {
//     const products = localStorage.getItem('shoppingCart').split(',');
//     const productsById = products.filter((product) => product === id);
//     this.setState({ quantity: productsById.length });
//     return productsById.length;
//   }

//   decreaseQuantity = ({ target: { id } }) => {
//     const { quantity } = this.state;
//     if (quantity > 0) {
//       const products = localStorage.getItem('shoppingCart').split(',');
//       const index = products.indexOf(id);
//       products.splice(index, 1);
//       localStorage.setItem('shoppingCart', [...products]);
//       this.getQuantity(id);
//       this.setState((prevState) => {
//         const { price } = prevState.products.find((product) => product.id === id);
//         this.setState({ total: prevState.total - price });
//       });
//     }
//   }

//   increaseQuantity = ({ target: { id } }) => {
//     const products = localStorage.getItem('shoppingCart').split(',');
//     localStorage.setItem('shoppingCart', [...products, id]);
//     this.getQuantity(id);

//     this.setState((prevState) => {
//       const { price } = prevState.products.find((product) => product.id === id);
//       this.setState({ total: prevState.total + price });
//     });
//   }

//   removeProduct = (id) => {
//     const productsList = localStorage.getItem('shoppingCart').split(',');
//     const productTotal = this.getQuantity(id);
//     const newProductsList = productsList.filter((product) => product !== id);
//     localStorage.setItem('shoppingCart', newProductsList);
//     this.setState((prevState) => {
//       const { products } = prevState;
//       const newProducts = products.filter((product) => product.id !== id);
//       const product = products.find((productData) => productData.id === id);
//       this.setState({
//         products: newProducts,
//         total: prevState.total - (productTotal * product.price),
//       });
//     });
//   }

//   render() {
//     const { products, quantity, total, redirect } = this.state;
//     if (redirect) {
//       return (
//         <Redirect
//           to={ {
//             pathname: '/checkout',
//             state: { products, total },
//           } }
//         />
//       );
//     }
//     return (
//       <div className="shopping-cart-page">
//         <Header />
//         <div className="container">
//           <h2>Meu Carrinho</h2>
//           { products.length > 0 && (
//             <div className="purchase-data">
//               <h3>
//                 { 'Total: ' }
//                 {
//                   total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
//                 }
//               </h3>

//               <button
//                 className="checkout"
//                 onClick={ this.checkout }
//                 type="button"
//               >
//                 Finalizar compra
//               </button>
//             </div>
//           )}
//           { products.length > 0
//             ? products.map((product) => (
//               <ShoppingCartProduct
//                 key={ product.id }
//                 id={ product.id }
//                 title={ product.title }
//                 image={ product.thumbnail }
//                 price={ product.price }
//                 removeProduct={ this.removeProduct }
//               />
//             ))
//             : 'Ainda não há nenhum produto no carrinho' }
//         </div>
//       </div>
//     );
//   }
// }

export default ShoppingCart;
