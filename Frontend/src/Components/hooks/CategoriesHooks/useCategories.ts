import { useEffect } from "react";
import { useAppSelector } from "../../../Redux/Store";
import { categoriesService } from "../../../Services/CategoriesService";
import { notify } from "../../../Utils/Notify";

export const useCategories = () => {
  //   const dispatch: AppDispatch = useDispatch();
  const categories = useAppSelector((state) => state?.categories?.entities);

  console.log(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await categoriesService.getAll();
        // dispatch(setCategories(categories));
      } catch (err: any) {
        notify.error(err);
      }
    };
    fetchCategories();
  }, []);

  return {
    categories,
  };
};
