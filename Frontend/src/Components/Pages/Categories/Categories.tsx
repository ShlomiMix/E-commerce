import { useEffect, useState } from "react";
import { CategoryModel } from "../../../Models/CategoryModel";
import { categoriesService } from "../../../Services/CategoriesService";
import { notify } from "../../../Utils/Notify";
import { CategoryCard } from "../../CardArea/CategoryCard/CategoryCard";
import "./Categories.css";
import { useCategories } from "../../hooks/CategoriesHooks/useCategories";

export function Categories(): JSX.Element {
  const { categories } = useCategories();
  return (
    <div className="flex flex-row flex-wrap gap-x-5 gap-y-5 xxs:justify-center md:justify-start md:m-5">
      {categories?.map((c, index) => (
        <CategoryCard category={c} key={index} />
      ))}
    </div>
  );
}
