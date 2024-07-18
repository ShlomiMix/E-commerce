import axios from "axios";
import { ProductModel } from "../Models/ProductModel";
import { appConfig } from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import {
  addOne,
  deleteOne,
  setProducts,
  updateOne,
} from "../Redux/ProductsSlice";
import { notify } from "../Utils/Notify";

interface ProductsResponse {
  products: {
    clothes: ProductModel[];
    shoes: ProductModel[];
    accessories: ProductModel[];
  };
  totalRows: number;
}

interface Filters {
  audienceId?: string;
  name?: string;
  description?: string;
  price?: number[];
  discount?: number;
  colors?: string[];
  categoryId?: string;
  subCategoryId?: string;
  companyId?: string;
  stock?: number;
  imagesUrl?: string;
  images?: FileList;
  sizes?: string[];
}

class ProductsService {
  public async getAllProductsByQueryFilter({
    name,
    audienceId,
    categoryId,
    subCategoryId,
    companyId,
    colors,
    sizes,
    price,
  }: Filters): Promise<ProductsResponse> {
    try {
      const params = new URLSearchParams();
      console.log({ audienceId, categoryId, subCategoryId });
      if (name) {
        params.append("name", name);
      }
      if (audienceId) {
        params.append("audienceId", audienceId);
      }
      if (categoryId) {
        params.append("categoryId", categoryId);
      }
      if (subCategoryId) {
        params.append("subCategoryId", subCategoryId);
      }

      if (companyId) {
        params.append("companyId", companyId);
      }

      if (colors) {
        params.append("color", colors.map((color) => color).toString());
      }

      if (sizes) {
        params.append("size", sizes.map((size) => size).toString());
      }

      if (price) {
        params.append("price", price.join(","));
      }

      const response = await axios.get<ProductsResponse>(
        `${appConfig.productsUrl}?${params.toString()}`
      );

      const { products, totalRows } = response.data;

      appStore.dispatch(
        setProducts({ products, totalRows, loading: false, error: null })
      );

      return { products, totalRows: totalRows };
    } catch (err: any) {
      notify.error(err);
    }
  }

  public async getOneProduct(_id: string): Promise<ProductModel> {
    try {
      const response = await axios.get<ProductModel>(
        `${appConfig.productsUrl}/` + _id
      );
      const product = response.data;
      return product;
    } catch (err: any) {
      notify.error(err);
    }
  }

  public async addProduct(product: ProductModel): Promise<void> {
    try {
      const formData = this.formData(product);
      const response = await axios.post<ProductModel>(
        `${appConfig.productsUrl}/`,
        formData
      );
      const addedProduct = response.data;

      appStore.dispatch(addOne(addedProduct));
      console.log(addedProduct);
    } catch (err: any) {
      notify.error(err);
    }
  }

  public async updateProduct(product: ProductModel): Promise<void> {
    try {
      const formData = this.formData(product);
      const response = await axios.put<ProductModel>(
        `${appConfig.productsUrl}/` + product._id,
        formData
      );
      const updatedProduct = response.data;
      appStore.dispatch(updateOne(updatedProduct));
      console.log(updatedProduct);
    } catch (err: any) {
      notify.error(err);
    }
  }

  public async deleteProduct(_id: string): Promise<void> {
    try {
      const response = await axios.delete<ProductModel>(
        `${appConfig.productsUrl}/` + _id
      );
      const deletedProduct = response.data;
      appStore.dispatch(deleteOne(deletedProduct));
      console.log(deletedProduct);
    } catch (err: any) {
      notify.error(err);
    }
  }

  private formData(product: ProductModel): FormData {
    const formData = new FormData();
    formData.append("audienceId", product.audienceId);
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price?.toString());
    formData.append("discount", product.discount?.toString());
    formData.append("categoryId", product.categoryId);
    formData.append("subCategoryId", product?.subCategoryId);
    formData.append("companyId", product?.companyId);

    if (product?.stock) {
      product?.stock?.map((stock, index) => {
        formData.append(`stock[${index}][color]`, stock.color._id);
        formData.append(`stock[${index}][size]`, stock.size._id);
        formData.append(`stock[${index}][quantity]`, stock.quantity.toString());
      });
    }

    if (product?.images?.length > 0) {
      Array.from(product.images).map((image) => {
        formData.append(`images`, image);
      });
    }

    return formData;
  }
}

export const productsService = new ProductsService();
