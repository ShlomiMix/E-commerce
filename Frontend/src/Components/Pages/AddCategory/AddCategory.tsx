import { CategoryForm } from "../../Forms/CategoryForm/CategoryForm";
import { useAddCategory } from "../../hooks/AddCategoryHooks/useAddCategory";

export function AddCategory(): JSX.Element {
  const {
    addSubCategory,
    deleteSubCategory,
    handleFileChange,
    imageFiles,
    imageUrl,
    subCategories,
    addCategory
  } = useAddCategory();

  return (
    <CategoryForm
      buttonName="Add"
      header="Add category"
      imagesRequired={true}
      sendCategory={addCategory}
      handleImageChange={handleFileChange}
      imageUrl={imageUrl}
      addSubCategory={addSubCategory}
      deleteSubCategory={deleteSubCategory}
      imageFile={imageFiles}
      subCategories={subCategories}
    />
  );
}
