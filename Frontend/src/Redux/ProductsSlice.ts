import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductModel } from "../Models/ProductModel";

export interface ProductsState {
  products: {
    clothes: ProductModel[];
    shoes: ProductModel[];
    accessories: ProductModel[];
  };
  totalRows: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: {
    clothes: [],
    shoes: [],
    accessories: [],
  },
  totalRows: 0,
  loading: true,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductsState>) => {
      return action.payload;
    },

    addOne: (state, action: PayloadAction<ProductModel>) => {
      const product = action.payload;
      const categoryName = product?.category?.name.toLocaleLowerCase();

      switch (categoryName) {
        case "clothing":
          state.products.clothes.push(product);
          break;
        case "footwear":
          state.products.shoes.push(product);
          break;
        case "accessories":
          state.products.accessories.push(product);
          break;

        default:
          throw new Error("can't find category");
      }
      state.loading = false;
    },

    updateOne: (state, action: PayloadAction<ProductModel>) => {
      const updatedProduct = action.payload;
      const categoryName = updatedProduct?.category?.name.toLocaleLowerCase();
      let index;
      if (categoryName === "clothes") {
        index = state.products.clothes.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index >= 0) {
          state.products.shoes[index] = updatedProduct;
        }
      } else if (categoryName === "shoes") {
        index = state.products.shoes.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index >= 0) {
          state.products.shoes[index] = updatedProduct;
        }
      } else if (categoryName === "accessories") {
        index = state.products.accessories.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index >= 0) {
          state.products.accessories[index] = updatedProduct;
        }
      }
      state.loading = false;
    },

    deleteOne: (state, action: PayloadAction<ProductModel>) => {
      const product = action.payload;
      const productId = action.payload._id;
      const categoryName = product?.category?.name.toLocaleLowerCase();
      let index;
      if (categoryName === "clothes") {
        index = state.products.clothes.findIndex(
          (product) => product._id === productId
        );
        if (index >= 0) {
          state.products.clothes.splice(index, 1);
        }
      } else if (categoryName === "shoes") {
        index = state.products.shoes.findIndex(
          (product) => product._id === productId
        );
        if (index >= 0) {
          state.products.shoes.splice(index, 1);
        }
      } else if (categoryName === "accessories") {
        index = state.products.accessories.findIndex(
          (product) => product._id === productId
        );
        if (index >= 0) {
          state.products.accessories.splice(index, 1);
        }
      }
      state.loading = false;
    },
  },
});

export const { setProducts, addOne, updateOne, deleteOne } =
  productSlice.actions;

export const productReducer = productSlice.reducer;
