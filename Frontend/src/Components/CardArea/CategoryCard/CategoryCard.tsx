import { useNavigate } from "react-router-dom";
import { CategoryModel } from "../../../Models/CategoryModel";
import { categoriesService } from "../../../Services/CategoriesService";
import "./CategoryCard.css";

interface CardProp {
  category: CategoryModel;
}

export function CategoryCard({ category }: CardProp): JSX.Element {
  const navigate = useNavigate();

  const navigateToEditPage = (categoryId: string): void => {
    navigate(`/edit-category/${categoryId}`);
  };

  const handleEditClick = () => {
    navigateToEditPage(category._id);
  };

  const handleDeleteCategory = async (_id: string): Promise<void> => {
    await categoriesService.deleteOne(_id);
  };

  const handleDeleteClick = (): void => {
    const sure = window.confirm("Are you sure?");
    if (!sure) {
      return;
    }
    handleDeleteCategory(category._id);
  };
  return (
    <div className="block border-double border-8 border-black rounded-xl bg-white shadow-secondary-1 dark:bg-surface-dark">
      <div
        className="relative w-64overflow-hidden bg-cover bg-no-repeat h-72 w-72"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        <img
          className="rounded-t-lg w-52 h-52 m-auto"
          src={category?.imageUrl}
          alt="category-image"
        />
        <a href="#!">
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </a>
      </div>
      <div className="p-6 text-surface dark:text-white flex flex-col justify-end h-80 flex-wrap">
        <h5 className="mb-2 text-xl font-medium leading-tight">
          {category?.name}
        </h5>
        {category?.subCategories?.map((subCategory, index) => (
          <p className="mb-4 text-base" key={index}>
            {subCategory?.name}
          </p>
        ))}
        <div className="flex gap-x-10">
          <button
            type="button"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            type="button"
            className="inline-block rounded bg-yellow-400 text-slate-950 transition-opacity opacity-80 hover:text-slate-50 hover:opacity-100 hover:bg-red-600 hover:scale-110 px-6 pb-2 pt-2.5 text-xs font-medium  leading-normal  shadow-primary-3 duration-1000 ease-linear hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
