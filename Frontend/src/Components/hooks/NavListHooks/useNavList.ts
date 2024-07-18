import { useState } from "react";
import { useAppSelector } from "../../../Redux/Store";

export const useNavList = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); // Toggle the state
  };
  console.log(isCartOpen);

  const cart = useAppSelector((state) => state.cart.products);

  const totalItemsInCart = Object.values(cart).reduce(
    (acc, product) => acc + product.amount,
    0
  );

  return {
    totalItemsInCart,
    toggleCart,
    isCartOpen,
    setIsCartOpen
  }
};
