import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryModel } from "../../../Models/CategoryModel";
import { categoriesService } from "../../../Services/CategoriesService";
import { subCategoriesService } from "../../../Services/SubCategoriesService";
import { notify } from "../../../Utils/Notify";

export const useEditCategory = () => {
  const navigate = useNavigate();
  const { setValue, watch } = useForm<CategoryModel>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  const { subCategories } = watch();

  console.log(subCategories);

  const { _id } = useParams();

  const fetchCategoryById = async (): Promise<void> => {
    if (_id) {
      try {
        const category = await categoriesService.getOne(_id);

        if (category) {
          setValue("name", category.name);
          setValue(
            "subCategories",
            category.subCategories.map((subCategory) => subCategory)
          );
          setImageUrl(category.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }
  };

  useEffect(() => {
    fetchCategoryById();
  }, [setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files;
    setImageFiles(file);
    if (file && file.length > 0) {
      const imagesUrl = URL.createObjectURL(file[0]);
      setImageUrl(imagesUrl);
    }
  };

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

  const editCategory = async (category: CategoryModel): Promise<void> => {
    try {
      category._id = _id;
      if (imageFiles && imageFiles[0]) {
        category.image = imageFiles[0];
      }

      if (!subCategories || subCategories.length === 0) {
        throw new Error("Must add at least one subcategory");
      }

      category.subCategories =
        await subCategoriesService.updateMultipleSubCategories(subCategories);

      console.log("category.subCategories", category?.subCategories);

      await categoriesService.updateOne(category);
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
    handleFileChange,
    addSubCategory,
    deleteSubCategory,
    editCategory,
  };
};
