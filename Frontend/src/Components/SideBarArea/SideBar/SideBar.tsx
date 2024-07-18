import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  Card,
  Drawer,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { CategoryModel } from "../../../Models/CategoryModel";
import { ColorModel } from "../../../Models/ColorModel";
import { CompanyModel } from "../../../Models/CompanyModel";
import { IdNameAble } from "../../../Models/IdNameAble";
import { PeopleAudienceModel } from "../../../Models/PeopleAudienceModel";
import { ProductModel } from "../../../Models/ProductModel";
import { SubCategoryModel } from "../../../Models/SubCategoryModel";
import { categoriesService } from "../../../Services/CategoriesService";
import { colorsService } from "../../../Services/ColorsService";

import { peopleAudiencesService } from "../../../Services/PeopleAudiencesService";
import { SelectMultipleInput } from "../../FormArea/FormInputs/SelectMultipleInput/SelectMultipleInput";
import { useSideBar } from "../../hooks/SideBarHooks/useSideBar";
import { PriceSliderFilter } from "../PriceSliderFilter/PriceSliderFilter";
import { SelectInputFilter } from "../SelectInputFilter/SelectInputFilter";
import "./SideBar.css";
import { useFetch } from "../../hooks/useFetch";
import { companiesService } from "../../../Services/CompaniesService";

interface SideBarProps {
  onColorsChange: (colors: string[]) => void;
  onSizesChange: (sizes: string[]) => void;
  onPriceChange: (priceRange: number[]) => void;
  valueText: (value: number) => string;
}

export function SideBar({
  onColorsChange,
  onSizesChange,
  onPriceChange,
  valueText,
}: SideBarProps): JSX.Element {
  const {
    openDrawer,
    isDrawerOpen,
    closeDrawer,
    isMobile,
    audienceId,
    categoryId,
    colors,
    companyId,
    sizes,
    subCategoryId,
    marks,
    handleAudienceChange,
    handleCategoryChange,
    handleColorChange,
    handleCompanyChange,
    handleSearchByName,
    handleSizeChange,
    handleSubCategoryChange,
    handleResetAudience,
    handleResetCompany,
    handleResetCategory,
    handleResetSubCategory,
  } = useSideBar({ onColorsChange, onSizesChange, onPriceChange });

  return (
    <div className="SideBar">
      <IconButton
        placeholder={""}
        variant="text"
        size="lg"
        className="icon absolute bg-none bg-opacity-1 text-none z-100 xxs:-top-56 xs:-top-48 xxs:-left-3 lgg:-top-52 lgg:mb-3 lg-1024:-top-56 md-820:-top-40 md:-top-56 lg:-top-44"
        onClick={openDrawer}
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2 z-100 " />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 z-50" />
        )}
      </IconButton>

      <Drawer
        className="drawer bg-opacity-1 bg-none xs:mt-28 md:mt-28 md:h-50 overflow-auto rounded-2xl bg-gray-300 "
        placeholder={""}
        placement={isMobile ? "bottom" : "left"}
        open={isDrawerOpen}
        onClose={closeDrawer}
        style={{ height: 200 }}
      >
        <Card
          placeholder={""}
          color="transparent"
          shadow={false}
          className=" w-full h-28 max-h-14 p-4 bg-opacity-0 bg-none"
        >
          <div className="mt-4 mb-2">
            <Input
              color="white"
              type="search"
              style={{ background: "white" }}
              crossOrigin={Accordion}
              onInput={handleSearchByName}
              placeholder="Search by name..."
              className="h-4 searchInputFilter"
            />
          </div>
          <div>
            <SelectInputFilter<ProductModel, PeopleAudienceModel>
              fnQuery={() => peopleAudiencesService.getAll()}
              valueId="audienceId"
              label="Audiences"
              onValueChange={handleAudienceChange}
              disabledOption="Choose audience"
              defaultValue={audienceId || ""}
              reset={handleResetAudience}
            />

            <SelectInputFilter<ProductModel, CompanyModel>
              fnQuery={() => companiesService.getAll()}
              valueId="companyId"
              label="Companies"
              onValueChange={handleCompanyChange}
              disabledOption="Choose company"
              defaultValue={companyId}
              reset={handleResetCompany}
            />

            <SelectInputFilter<ProductModel, CategoryModel>
              fnQuery={() => categoriesService.getAll()}
              valueId="categoryId"
              label="Categories"
              onValueChange={handleCategoryChange}
              disabledOption="choose category"
              defaultValue={categoryId}
              reset={handleResetCategory}
            />
            <SelectInputFilter<ProductModel, SubCategoryModel>
              fnQuery={
                categoryId
                  ? () =>
                      categoriesService.getSubCategoriesByCategoryId(categoryId)
                  : () => Promise.resolve([])
              }
              disabled={!categoryId}
              valueId="subCategoryId"
              label="Sub categories"
              onValueChange={handleSubCategoryChange}
              disabledOption="Choose sub category"
              defaultValue={subCategoryId}
              reset={handleResetSubCategory}
            />

            <SelectMultipleInput<ColorModel>
              fnQuery={()=> colorsService.getAll()}
              value={colors}
              disabledOption="Select color"
              defaultValue={[]}
              disabled={false}
              name="colors"
              label="Colors"
              handleChangeValue={handleColorChange}
            />
            <SelectMultipleInput<IdNameAble>
              fnQuery={() => Promise.resolve(sizes)}
              disabled={!categoryId}
              name="sizes"
              label="Sizes"
              disabledOption="Select size"
              defaultValue={[]}
              handleChangeValue={handleSizeChange}
            />
            <PriceSliderFilter
              onPriceChange={onPriceChange}
              valueText={valueText}
              marks={marks}
            />
          </div>
        </Card>
      </Drawer>
    </div>
  );
}
