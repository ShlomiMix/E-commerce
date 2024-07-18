import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel";
import { notify } from "../Utils/Notify";

interface CartProduct {
  product: ProductModel;
  stockId: string;
  amount: number;
}

export interface CartProps {
  products: Record<string, CartProduct>;
}

const initialState: CartProps = {
  products: {},
};

const generateId = (product: ProductModel, stockId: string) => {
  return `${product._id}_${stockId}`;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initAllProducts: (state, action: PayloadAction<CartProps>) => {
      return action.payload;
    },

    addToCart: (
      state,
      action: PayloadAction<{ product: ProductModel; stockId: string }>
    ) => {
      const { product, stockId } = action.payload;
      const productId = generateId(product, stockId);
      const stockItemIndex = product.stock.findIndex(
        (stock) => stock._id === stockId
      );

      if (stockItemIndex === -1 || product.stock[stockItemIndex].quantity < 1) {
        throw new Error("Out of stock");
      }

      if (state.products[productId]) {
        if(state.products[productId].amount >= product.stock[stockItemIndex].quantity) {
            notify.error("Out of stock")
            return
        }
        state.products[productId].amount += 1;
      } else {
        state.products[productId] = { product, stockId, amount: 1 };
      }

      const updatedStock = state.products[productId].product.stock.map((stock, index) =>
        index === stockItemIndex
          ? { ...stock, quantity: stock.quantity - 1 }
          : stock
      );

          state.products[productId].product.stock = updatedStock
    },

    updateAmount: (
      state,
      action: PayloadAction<{ productId: string; amount: number }>
    ) => {
      const { productId } = action.payload;
      if (state.products[productId].amount === 1) {
        state.products[productId].amount += 1;
      } else {
        state.products[productId].amount -= 1;
        if (state.products[productId].amount < 1) {
          delete state.products[productId];
        }
      }
    },

    incrementAmount: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const productInCart = state.products[productId];
      if (!productInCart) {
        return;
      }
      const stockItemIndex = productInCart.product.stock?.findIndex(
        (stock) => stock._id === productInCart.stockId
      );
      if (productInCart.product.stock[stockItemIndex].quantity > 0) {
        productInCart.amount += 1;
        const updatedStock = productInCart.product.stock.map((stock, index) =>
          index === stockItemIndex
            ? { ...stock, quantity: stock.quantity - 1 }
            : stock
        );

        productInCart.product.stock = updatedStock;
      }
      if (productInCart.product.stock[stockItemIndex].quantity < 1) {
        notify.error("Out of stock");
      }
    },

    decrementAmount: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const productInCart = state.products[productId];
      if (!productInCart) {
        return;
      }
      const stockItemIndex = productInCart.product.stock.findIndex(
        (stock) => stock._id === productInCart.stockId
      );

      if (stockItemIndex === -1) {
        return;
      }

      if (productInCart.amount > 1) {
        productInCart.amount -= 1;
        const updatedStock = productInCart.product.stock.map((stock, index) =>
          index === stockItemIndex
            ? { ...stock, quantity: stock.quantity + 1 }
            : stock
        );

        productInCart.product.stock = updatedStock;
      } else {
        const updatedStock = productInCart.product.stock.map((stock, index) =>
          index === stockItemIndex
            ? { ...stock, quantity: stock.quantity + productInCart.amount }
            : stock
        );
        productInCart.product.stock = updatedStock;
        delete state.products[productId];
      }
    },

    deleteFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      delete state.products[productId];
    },

    resetCart: (state) => {
        state.products = {}
    }
  },
});

export const {
  initAllProducts,
  addToCart,
  updateAmount,
  incrementAmount,
  decrementAmount,
  deleteFromCart,
  resetCart
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
