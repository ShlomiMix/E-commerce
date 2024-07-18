import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CategoryModel } from "../../../Models/CategoryModel";
import { SubCategoryModel } from "../../../Models/SubCategoryModel";
import { categoriesService } from "../../../Services/CategoriesService";
import { ImageInput } from "../../FormArea/FormInputs/ImageInput/ImageInput";
import { ParentSubCategoryInput } from "../../FormArea/FormInputs/ParentSubCategoryInput/ParentSubCategoryInput";
import { StringInput } from "../../FormArea/FormInputs/StringInput/StringInput";
import { GenericForm } from "../../FormArea/GenericForm/GenericForm";
import "./CategoryForm.css";

interface CategoryFormProps {
  imagesRequired: boolean;
  buttonName: string;
  header: string;
  sendCategory: (category: CategoryModel) => Promise<void>;
  handleImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl?: string | null;
  imageFile: FileList;
  subCategories: SubCategoryModel[];
  addSubCategory: () => void;
  deleteSubCategory: (index: number) => void;
}

export function CategoryForm({
  imagesRequired,
  header,
  buttonName,
  sendCategory,
  addSubCategory,
  deleteSubCategory,
  subCategories,
  handleImageChange,
  imageUrl,
}: CategoryFormProps): JSX.Element {
  const { handleSubmit, setValue, register } = useForm<CategoryModel>();

  const { _id } = useParams();

  const fetchName = async () => {
    if (_id) {
      const category = await categoriesService.getOne(_id);

      if (category) {
        setValue("name", category.name);
      }
    }
  };

  useEffect(() => {
    fetchName();
  }, [setValue, _id]);

  return (
    <GenericForm
      buttonName={buttonName}
      header={header}
      submit={handleSubmit(sendCategory)}
      inputs={[
        <StringInput<CategoryModel>
          label="Category Name"
          minLength={3}
          maxLength={30}
          name="name"
          type="text"
          register={register}
          registerName="name"
        />,
        <ParentSubCategoryInput
          subCategories={subCategories}
          addSubCategory={addSubCategory}
          handleSubCategoryChange={(name, index) => {
            const subCategoryArr = [...subCategories];
            subCategoryArr[index].name = name;
            setValue("subCategories", subCategoryArr);
          }}
          onDelete={deleteSubCategory}
        />,

        <ImageInput
          imagesUrl={imageUrl}
          required={imagesRequired}
          onChange={handleImageChange}
        />,
      ]}
    ></GenericForm>
  );
}
