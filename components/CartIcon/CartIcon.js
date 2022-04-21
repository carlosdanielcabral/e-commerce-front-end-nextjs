import React from "react";
import { useRouter } from "next/router";
import { BsFillCartFill } from "react-icons/bs";
import styles from "./CartIcon.module.css";

const CartIcon = () => {
  const router = useRouter();

  return (
    <button
      className={styles.cartIcon}
      type="button"
      onClick={ () => router.push('/shopping-cart') }
    >
      <BsFillCartFill />
    </button>
  );
}

export default CartIcon;
