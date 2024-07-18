import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { debounce } from "ts-debounce";
import { CategoryModel } from "../../../Models/CategoryModel";
import { ColorModel } from "../../../Models/ColorModel";
import { CompanyModel } from "../../../Models/CompanyModel";
import { IdNameAble } from "../../../Models/IdNameAble";
import { PeopleAudienceModel } from "../../../Models/PeopleAudienceModel";
import { ProductModel } from "../../../Models/ProductModel";
import { SubCategoryModel } from "../../../Models/SubCategoryModel";
import { categoriesService } from "../../../Services/CategoriesService";
import { clothesSizesService } from "../../../Services/ClothSizesService";
import { shoesSizesService } from "../../../Services/ShoesSizesService";
import { accessorySizesService } from "../../../Services/AccessorySizesService";


interface useSideBarProp {
  onColorsChange: (colors: string[]) => void;
  onSizesChange: (sizes: string[]) => void;
  onPriceChange: (priceRange: number[]) => void;
}

export const useSideBar = ({
  onColorsChange,
  onSizesChange,
  onPriceChange,
}: useSideBarProp) => {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [colors, setColors] = useState<ColorModel[]>([]);
  const [sizes, setSizes] = useState<IdNameAble[]>([]);
  const { setValue } = useFormContext<ProductModel>();
  const [searchParams, setSearchParams] = useSearchParams();
  const audienceId = searchParams.get("audienceId");
  const companyId = searchParams.get("companyId");
  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId");
  //   const price = searchParams.get("price");

  const marks = [
    {
      value: 1,
      label: "1$",
    },
    {
      value: 250,
      label: "250$",
    },
    {
      value: 500,
      label: "500$",
    },
    {
      value: 750,
      label: "750$",
    },
    {
      value: 1000,
      label: "1000$",
    },
  ];

  const navigate = useNavigate();

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 700);
  };

  const handleCompanyChange = (company: CompanyModel): void => {
    setValue("companyId", company._id);
    updateSearchParams({ companyId: company._id });
  };

  const handleResetCompany = () => {
    updateSearchParams({ companyId: "" });
  };

  const handleAudienceChange = (audience: PeopleAudienceModel) => {
    setValue("audienceId", audience._id);
    updateSearchParams({ audienceId: audience._id });
  };

  const handleResetAudience = () => {
    updateSearchParams({ audienceId: "" });
  };

  const handleCategoryChange = async (category: CategoryModel) => {
    setValue("categoryId", category._id);
    updateSearchParams({ categoryId: category._id });
  };

  const handleResetCategory = () => {
    updateSearchParams({ categoryId: "" });
  };

  const handleSubCategoryChange = (subCategory: SubCategoryModel) => {
    setValue("subCategoryId", subCategory._id);
    updateSearchParams({ subCategoryId: subCategory._id });
  };

  const handleResetSubCategory = () => {
    updateSearchParams({ subCategoryId: "" });
  };

  const handleColorChange = (selectedColors: ColorModel[]) => {
    setColors(selectedColors);
    const colorIds = selectedColors?.map((color) => color._id);
    onColorsChange(colorIds);
  };

  const handleSizeChange = (selectedSizes: IdNameAble[]) => {
    const sizeIds = selectedSizes.map((size) => size._id);
    onSizesChange(sizeIds);
  };

  const handlePriceChange = useCallback(
    (priceRange: number[]) => {
      onPriceChange(priceRange);
    },
    [onPriceChange]
  );

  console.log(subCategoryId);

  const debouncedSearchByName = debounce((name: string) => {
    setValue("name", name);
    updateSearchParams({ name: name });
  }, 500);

  const handleSearchByName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearchByName(value);
  };

  const updateSearchParams = useCallback(
    (params: Record<string, string | string[]>): void => {
      const newSearchParams = new URLSearchParams(searchParams);

      // Clear all previous parameters except 'categoryId' and 'audienceId'
      for (const param of newSearchParams.keys()) {
        if (param.length === 0) {
          newSearchParams.delete(param);
        }
      }

      // Set new parameters
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((v) => newSearchParams.append(key, v));
          } else {
            newSearchParams.set(key, value);
          }
        } else {
          newSearchParams.delete(key);
        }
      });

      setSearchParams(newSearchParams);
      navigate(`?${newSearchParams.toString()}`);
    },
    [searchParams, navigate, setSearchParams]
  );

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => {
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 100); // Adjust the delay as needed
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (categoryId) {
      const fetchSizes = async (category: CategoryModel) => {
        const categoryName = category.name?.toLocaleLowerCase();
        let sizes: IdNameAble[] = [];

        switch (categoryName) {
          case "clothing":
            sizes = await clothesSizesService.getAll();
            break;

          case "footwear":
            sizes = await shoesSizesService.getAll();
            break;

          case "accessories":
            sizes = await accessorySizesService.getAll();
            break;

          default:
        }

        setSizes(sizes);
      };

      const fetchCategoryAndSizes = async (categoryId: string) => {
        const category = await categoriesService.getOne(categoryId);
        if (category) {
          await fetchSizes(category);
        }
      };

      fetchCategoryAndSizes(categoryId);
    }
  }, [categoryId]);

  return {
    isDrawerOpen,
    isMobile,
    audienceId,
    companyId,
    categoryId,
    subCategoryId,
    colors,
    sizes,
    marks,
    openDrawer,
    closeDrawer,
    handleSearchByName,
    handleAudienceChange,
    handleCompanyChange,
    handleCategoryChange,
    handleSubCategoryChange,
    handleColorChange,
    handleSizeChange,
    handleResetAudience,
    handleResetCompany,
    handleResetCategory,
    handleResetSubCategory,
  };
};
