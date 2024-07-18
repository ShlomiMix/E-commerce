import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { CategoryModel } from "../../Models/CategoryModel";
import { IdNameAble } from "../../Models/IdNameAble";
import { ProductModel } from "../../Models/ProductModel";
import { accessorySizesService } from "../../Services/AccessorySizesService";
import { clothesSizesService } from "../../Services/ClothSizesService";
import { shoesSizesService } from "../../Services/ShoesSizesService";

export const useCustomizedForm = () => {
  const [sizes, setSizes] = useState([]);

  const { register, handleSubmit, setValue, watch } = useForm<ProductModel>();

  const {
    categoryId,
    audienceId,
    subCategoryId,
    companyId,
    stock = [],
  } = watch();

  async function handleCategoryChange(category: CategoryModel): Promise<void> {
    setValue("categoryId", category._id);
    const categoryName = category?.name.toLocaleLowerCase();
    let sizes: IdNameAble[] = [];

    switch (categoryName) {
      case "clothing":
        sizes = await clothesSizesService.getAll();
        break;

      case "footwear":
        sizes = await shoesSizesService.getAll();
        break;

      case "accessories":
        sizes = await accessorySizesService.getAll();
        break;

      default:
    }

    setSizes(sizes);
  }

  const addStock = useCallback(() => {
    const stockArr = [...stock];
    stockArr.push({
      color: null,
      size: null,
      quantity: 0,
    });

    setValue("stock", stockArr);
  }, [stock, setValue]);

  const deleteStock = useCallback(
    (index: number) => {
      const stockArr = [...stock];
      stockArr.splice(index, 1);
      setValue("stock", stockArr);
    },
    [stock, setValue]
  );

  return {
    companyId,
    audienceId,
    categoryId,
    subCategoryId,
    register,
    stock,
    handleSubmit,
    sizes,
    handleCategoryChange,
    addStock,
    setValue,
    deleteStock,
  };
};
