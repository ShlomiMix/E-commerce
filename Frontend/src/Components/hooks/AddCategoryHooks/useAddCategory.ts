import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CategoryModel } from "../../../Models/CategoryModel";
import { categoriesService } from "../../../Services/CategoriesService";
import { subCategoriesService } from "../../../Services/SubCategoriesService";
import { notify } from "../../../Utils/Notify";

export const useAddCategory = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>(null);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const { setValue, watch } = useForm<CategoryModel>();
  const subCategories = watch("subCategories", []);

  const addSubCategory = useCallback(() => {
    const subCategoriesArr = [...subCategories];
    subCategoriesArr.push({ name: "" });
    console.log({ subCategoriesArr });
    setValue("subCategories", subCategoriesArr);
  }, [subCategories, setValue]);

  const deleteSubCategory = useCallback(
    (index: number) => {
      const subCategoriesArr = [...subCategories];
      subCategoriesArr.splice(index, 1);
      setValue("subCategories", subCategoriesArr);
    },
    [subCategories, setValue]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files;
    setImageFiles(file);
    if (file && file.length > 0) {
      const imagesUrl = URL.createObjectURL(file[0]);
      setImageUrl(imagesUrl);
    }
  };
  const addCategory = async (category: CategoryModel): Promise<void> => {
    try {
      if (imageFiles && imageFiles[0]) {
        category.image = imageFiles[0];
      }

      category.subCategories =
        await subCategoriesService.addMultipleSubCategories(subCategories);
      if (subCategories.length === 0) {
        throw new Error("You must to have one sub category at least");
      }
      await categoriesService.addOne(category);
      notify.success("Category has been added");
      navigate("/categories");
    } catch (err: any) {
      notify.error(err);
    }
  };

  return {
    imageUrl,
    imageFiles,
    subCategories,
    navigate,
    addSubCategory,
    deleteSubCategory,
    handleFileChange,
    setImageUrl,
    addCategory,
  };
};
