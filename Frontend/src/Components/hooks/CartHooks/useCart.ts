import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    decrementAmount,
    deleteFromCart,
    incrementAmount,
} from "../../../Redux/CartSlice";
import { AppDispatch, useAppSelector } from "../../../Redux/Store";

export const useCart = () => {
  const [activeIndices, setActiveIndices] = useState<{ [key: string]: number }>(
    {}
  );

  const cart = useAppSelector((state) => state?.cart?.products);

  console.log(cart);

  const dispatch: AppDispatch = useDispatch();

  const handleRemove = (productId: string) => {
    dispatch(deleteFromCart(productId));
  };

  const handleDecrementAmount = (productId: string) => {
    dispatch(decrementAmount(productId));
  };

  const handleIncrementAmount = (productId: string) => {
    dispatch(incrementAmount(productId));
  };

  const subtotal = Object.values(cart).reduce((acc, product) => {
    const totalPriceForProduct = product.product.price * product.amount;
    return acc + totalPriceForProduct;
  }, 0);

  const handleNextImage = (productId: string, totalImages: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages,
    }));
  };

  const handlePrevImage = (productId: string, totalImages: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  return {
    activeIndices,
    cart,
    handleIncrementAmount,
    handleDecrementAmount,
    handleRemove,
    subtotal,
    handleNextImage,
    handlePrevImage,
  };
};
