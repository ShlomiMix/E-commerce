import { CategoryForm } from "../../Forms/CategoryForm/CategoryForm";
import { useEditCategory } from "../../hooks/EditCategoryHooks/useEditCategory";
import "./EditCategory.css";

export function EditCategory(): JSX.Element {
  const {
    addSubCategory,
    deleteSubCategory,
    editCategory,
    handleFileChange,
    imageFiles,
    imageUrl,
    subCategories,
  } = useEditCategory();

  return (
    <div className="EditCategory">
      <CategoryForm
        buttonName="Save"
        header="Edit category"
        imagesRequired={false}
        sendCategory={editCategory}
        addSubCategory={addSubCategory}
        deleteSubCategory={deleteSubCategory}
        imageFile={imageFiles}
        subCategories={subCategories}
        handleImageChange={handleFileChange}
        imageUrl={imageUrl}
      />
    </div>
  );
}
