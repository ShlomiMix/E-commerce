import { SubCategoryModel } from "../../../../Models/SubCategoryModel";
import { SubCategoryInput } from "../SubCategoryInput/SubCategoryInput";
import "./ParentSubCategoryInput.css";

interface ParentSubCategoryInputProp {
  subCategories: SubCategoryModel[];
  handleSubCategoryChange: (subCategory: string, index: number) => void;
  addSubCategory: () => void;
  onDelete:(index:number) => void
}

export function ParentSubCategoryInput({
  subCategories,
  handleSubCategoryChange,
  addSubCategory,
  onDelete
}: ParentSubCategoryInputProp): JSX.Element {
  return (
    <div className="ParentSubCategoryInput">
      {subCategories?.map((subCategory, index) => (
        <SubCategoryInput
          key={index}
          initialSubCategory={subCategory.name}
          onChange={(name) => handleSubCategoryChange(name, index)}
          onDelete={()=> onDelete(index)}
        />
      ))}
       <div className="flex justify-center mt-4 mb-4">
      <button className="bg-slate-50 px-3 text-slate-950 rounded-3xl p-1 hover:bg-green-600 hover:text-white hover:transition-opacity opacity-70 hover:opacity-100 hover:scale-110" type="button" onClick={addSubCategory}>
        Add sub Category
      </button>

       </div>
    </div>
  );
}
