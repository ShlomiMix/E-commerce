import { MenuItem, Typography } from "@material-tailwind/react";
import { CategoryModel } from "../../../Models/CategoryModel";

interface RenderItemsProp {
  categories: CategoryModel[];
  audienceId:string
  getProductByCategoryId: (audienceId: string, categoryId: string) => void;
  getProductsBySubCategory: (
    audienceId: string,
    categoryId: string,
    subCategoryId: string
  ) => void;

  
}

export function RenderItems({
  categories,
   audienceId,
  getProductByCategoryId,
  getProductsBySubCategory,
}: RenderItemsProp): JSX.Element {
  return (
    <>
      {categories?.map((category) => (
        <div key={category._id}>
          <MenuItem
            className="flex items-start gap-3 rounded-lg z-49"
            placeholder={undefined}
          >
            <div className="flex items-center justify-center rounded-lg !bg-black-50 p-2 z-49">
              <img
                className="sm:w-16 sm:h-16 md:w-24 md:h-24 lg:h-38 lg:w-38 xl:h-42 xl:w-42 h-20 w-20 z-49"
                alt={`photo`}
                src={category.imageUrl}
              />
            </div>
            <div>
              <Typography
                variant="h6"
                color="black"
                className="flex items-center text-sm font-bold underline z-49"
                placeholder={undefined}
                onClick={() => {
                  getProductByCategoryId(audienceId, category?._id);
                }}
              >
                {category?.name}
              </Typography>
              <div>
                {category.subCategories.map((subCategory) => {
                  return (
                    <Typography
                      key={subCategory._id}
                      variant="h6"
                      color="black"
                      className="flex items-center text-sm font-bold z-49"
                      placeholder={""}
                      onClick={() => {
                        getProductsBySubCategory(
                          audienceId,
                          category._id,
                          subCategory._id
                        );
                      }}
                    >
                      {subCategory.name}
                    </Typography>
                  );
                })}
              </div>
            </div>
          </MenuItem>
        </div>
      ))}
    </>
  );
}
