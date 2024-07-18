import { AccessorySizeModel } from "./AccessorySizeModel";
import { CategoryModel } from "./CategoryModel";
import { ClothSizeModel } from "./ClothSizeModel";
import { ColorModel } from "./ColorModel";
import { CompanyModel } from "./CompanyModel";
import { IdNameAble } from "./IdNameAble";
import { PeopleAudienceModel } from "./PeopleAudienceModel";
import { ShoeSizeModel } from "./ShoeSizeModel";
import { StockModel } from "./StockModel";
import { SubCategoryModel } from "./SubCategoryModel";

export interface ProductModel extends IdNameAble {
  audienceId: string;
  audience: PeopleAudienceModel;
  description?: string;
  price?: number;
  discount?: number;
  categoryId?: string;
  category?: CategoryModel;
  subCategory?: SubCategoryModel;
  subCategoryId:string
  companyId?: string;
  company?: CompanyModel;
  stock?: StockModel[];
  imagesUrl: string[];
  images:FileList
}
