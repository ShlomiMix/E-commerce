import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { PeopleAudienceModel } from "../Models/PeopleAudienceModel";
import { CategoryModel } from "../Models/CategoryModel";
import { IdNameAble } from "../Models/IdNameAble";
import { ClothSizeModel } from "../Models/ClothSizeModel";
import { ShoeSizeModel } from "../Models/ShoeSizeModel";
import { AccessorySizeModel } from "../Models/AccessorySizeModel";
import { CompanyModel } from "../Models/CompanyModel";
import { ColorModel } from "../Models/ColorModel";

// Define a generic type for entities with an ID
export interface EntityState<T extends { _id?: string }> {
  entities: T[];
  status: string
  error: null | string;
}

// Define a generic initialState
const initialState: EntityState<any> = {
  entities: [],
  status: "idle",
  error: null,
};

// Define a generic reducer function to handle CRUD operations
const createCrudSlice = <T extends { _id?: string }>(name: string) => {
  const slice = createSlice({
    name,
    initialState: initialState as EntityState<T>,
    reducers: {
      setEntities(
        state: Draft<EntityState<T>>,
        action: Draft<PayloadAction<T[]>>
      ) {
        state.entities = action.payload;
      },
      addEntity(state: Draft<EntityState<T>>, action: Draft<PayloadAction<T>>) {
        state.entities.push(action.payload);
      },
      updateEntity(
        state: Draft<EntityState<T>>,
        action: Draft<PayloadAction<T>>
      ) {
        const index = state.entities.findIndex(
          (v) => v._id === action.payload._id
        );
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      },
      deleteEntity(
        state: Draft<EntityState<T>>,
        action: PayloadAction<string>
      ) {
        const index = state.entities.findIndex((v) => v._id === action.payload);
        if (index !== -1) {
          state.entities.splice(index, 1);
        }
      },
    },
  });

  return slice;
};

// Usage example with PeopleAudienceModel
const audiencesSlice = createCrudSlice<PeopleAudienceModel>("audiences");

export const {
  setEntities: setAudiences,
  addEntity: addAudience,
  updateEntity: updateAudience,
  deleteEntity: deleteAudience,
} = audiencesSlice.actions;

export const audiencesReducer = audiencesSlice.reducer;

// Usage example with CategoryModel
const categoriesSlice = createCrudSlice<CategoryModel>("categories");

export const {
  setEntities: setCategories,
  addEntity: addCategory,
  updateEntity: updateCategory,
  deleteEntity: deleteCategory,
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

const clothSizesSlice = createCrudSlice<ClothSizeModel>("clothSizes");

export const {
  setEntities: setClothSizes,
  addEntity: addClothSize,
  updateEntity: updateClothSize,
  deleteEntity: deleteClothSize,
} = clothSizesSlice.actions;

export const clothSizesReducer = clothSizesSlice?.reducer;

const shoeSizesSlice = createCrudSlice<ShoeSizeModel>("shoeSizes");

export const {
  setEntities: setShoeSizes,
  addEntity: addShoeSize,
  updateEntity: updateShoeSize,
  deleteEntity: deleteShoeSize,
} = shoeSizesSlice.actions;

export const shoeSizesReducer = shoeSizesSlice?.reducer;

const AccessorySizesSlice =
  createCrudSlice<AccessorySizeModel>("accessorySizes");

export const {
  setEntities: setAccessorySizes,
  addEntity: addAccessorySize,
  updateEntity: updateAccessorySize,
  deleteEntity: deleteAccessorySize,
} = AccessorySizesSlice.actions;

export const accessorySizesReducer = AccessorySizesSlice?.reducer;

const companiesSlice = createCrudSlice<CompanyModel>("companies");

export const {
  setEntities: setCompanies,
  addEntity: addCompany,
  updateEntity: updateCompany,
  deleteEntity: deleteCompany,
} = companiesSlice.actions;

export const companyReducer = companiesSlice?.reducer;

const colorsSlice = createCrudSlice<ColorModel>("colors");

export const {
  setEntities: setColors,
  addEntity: addColor,
  updateEntity: updateColor,
  deleteEntity: deleteColor,
} = colorsSlice.actions;

export const colorReducer = colorsSlice?.reducer;
