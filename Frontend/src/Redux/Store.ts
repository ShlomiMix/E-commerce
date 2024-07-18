import  { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "./AppState";
import { authReducersContainer } from "./AuthSlice";
import { cartReducer } from "./CartSlice";

import {
  accessorySizesReducer,
  audiencesReducer,
  categoriesReducer,
  clothSizesReducer,
  colorReducer,
  companyReducer,
  shoeSizesReducer,
} from "./GenericSlice";
import { productReducer } from "./ProductsSlice";
import { userReducersContainer } from "./UserSlice";
import { GenericService } from "../Services/GenericService";

// This line initializes the Redux store using the configureStore function, which is provided by the Redux Toolkit.
export const appStore = configureStore({
  // The `reducer` key specifies the root reducer for the Redux store. It combines multiple reducers into a single reducer function.
  reducer: {
    // auth is a slice of the state managed by the `authReducersContainer` reducer.
    auth: authReducersContainer,

    // user is a slice of the state managed by the `userReducersContainer` reducer.
    user: userReducersContainer,

    cart: cartReducer,

    products: productReducer,

    audiences: audiencesReducer,

    categories: categoriesReducer,

    clothSizes: clothSizesReducer,

    shoeSizes: shoeSizesReducer,

    accessorySizes: accessorySizesReducer,

    companies: companyReducer,

    colors: colorReducer,
  },

});

export type AppDispatch = typeof appStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;


