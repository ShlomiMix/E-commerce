import { useState } from "react";
import { SubCategoryModel } from "../../../../Models/SubCategoryModel";
import "./SubCategoryInput.css";

interface SubCategoryInputProp {
 onChange:(value:string) => void
 initialSubCategory:string
 onDelete:()=> void
}


export function SubCategoryInput({onChange, initialSubCategory, onDelete}:SubCategoryInputProp): JSX.Element {

    const [subCategory, setSubCategory] = useState<string>(initialSubCategory || "")

    function handleSubCategoryChange(event:React.ChangeEvent<HTMLInputElement>) {
        const subCategory = event.target.value
        setSubCategory(subCategory)
        onChange(subCategory)
    }
   
  return (
    <div className="SubCategoryInput">
      <div className="md:w-3/3 relative">
        <label className="name-label">Sub Category Name</label>
        <input
          required
          type={"text"}
          minLength={3}
          maxLength={30}
          value={subCategory}
          name={"subCategory"}
          onChange={handleSubCategoryChange}
          className="bg-black-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
        <button type="button" className="absolute -top-0 right-0" onClick={onDelete}>❌</button>
      </div>
    </div>
  );
}
