import { AccessorySizeModel } from "../Models/AccessorySizeModel";
import { CategoryModel } from "../Models/CategoryModel";
import { ClothSizeModel } from "../Models/ClothSizeModel";
import { ColorModel } from "../Models/ColorModel";
import { CompanyModel } from "../Models/CompanyModel";
import { PeopleAudienceModel } from "../Models/PeopleAudienceModel";
import { ProductModel } from "../Models/ProductModel";
import { ShoeSizeModel } from "../Models/ShoeSizeModel";
import { UserModel } from "../Models/UserModel";
import { CartProps } from "./CartSlice";
import { EntityState } from "./GenericSlice";
import { ProductsState } from "./ProductsSlice";
import { UserSlice } from "./UserSlice";

export type AppState = {
  user: UserSlice;
  auth: UserModel;
  cart: CartProps;
  products: ProductsState;
  audiences: EntityState<PeopleAudienceModel>;
  categories: EntityState<CategoryModel>;
  clothSizes: EntityState<ClothSizeModel>;
  shoeSizes: EntityState<ShoeSizeModel>;
  accessorySizes: EntityState<AccessorySizeModel>;
  companies: EntityState<CompanyModel>;
  colors: EntityState<ColorModel>;
};
