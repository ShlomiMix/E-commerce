import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryModel } from "../../../Models/CategoryModel";
import { CompanyModel } from "../../../Models/CompanyModel";
import { PeopleAudienceModel } from "../../../Models/PeopleAudienceModel";
import { ProductModel } from "../../../Models/ProductModel";
import { SubCategoryModel } from "../../../Models/SubCategoryModel";
import { categoriesService } from "../../../Services/CategoriesService";
import { companiesService } from "../../../Services/CompaniesService";
import { peopleAudiencesService } from "../../../Services/PeopleAudiencesService";
import { productsService } from "../../../Services/ProductsService";
import { notify } from "../../../Utils/Notify";
import { ImageMultipleInput } from "../../FormArea/FormInputs/ImageMultipleInput/ImageMultipleInput";
import { NumberInput } from "../../FormArea/FormInputs/NumberInput/NumberInput";
import { ParentSelectStockComponent } from "../../FormArea/FormInputs/ParentSelectStockComponent/ParentSelectStockComponent";
import { SelectInput } from "../../FormArea/FormInputs/SelectInput/SelectInput";
import { StringInput } from "../../FormArea/FormInputs/StringInput/StringInput";
import { TextAreaInput } from "../../FormArea/FormInputs/TextAreaInput/TextAreaInput";
import { GenericForm } from "../../FormArea/GenericForm/GenericForm";
import { useCustomizedForm } from "../../hooks/useForm";

interface Props {
  submit: (product: ProductModel) => void;
  imageRequired: boolean;
  imagesUrl: string[];
  imagesFiles: FileList;
  disableCategory: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setImagesUrl: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ProductForm = ({
  submit,
  imageRequired,
  handleFileChange,
  imagesUrl,
  setImagesUrl,
  disableCategory,
}: Props) => {
  const { _id } = useParams();

  const {
    audienceId,
    categoryId,
    companyId,
    register,
    setValue,
    stock,
    subCategoryId,
    handleSubmit,
    sizes,
    handleCategoryChange,
    addStock,
    deleteStock,
  } = useCustomizedForm();

  const fetchData = async () => {
    try {
      if (!_id) {
        return;
      }

      const p = await productsService.getOneProduct(_id);
      console.log(p);
      if (p) {
        setValue("audienceId", p?.audienceId);
        setValue("companyId", p?.companyId);
        setValue("categoryId", p?.categoryId);
        setValue("subCategoryId", p?.subCategoryId);
        setValue("name", p?.name);
        setValue("description", p?.description);
        setValue("stock", p?.stock || []);
        setValue("price", p?.price);
        setValue("discount", p?.discount);
        setImagesUrl(p?.imagesUrl);
        if (p?.category) {
          await handleCategoryChange(p.category); // Fetch sizes for initial category
        }
      }
    } catch (err: any) {
      notify.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setValue, setImagesUrl]);

  return (
    <GenericForm
      buttonName="Add"
      submit={handleSubmit(submit)}
      header="Add"
      inputs={[
        <SelectInput<ProductModel, PeopleAudienceModel>
          fnQuery={()=>peopleAudiencesService.getAll()}
          onValueChange={({ _id }) => setValue("audienceId", _id)}
          name="Audience"
          register={register}
          registerName="audienceId"
          disabledOption="Select Audience"
          defaultValue={audienceId}
        />,
        <SelectInput<ProductModel, CompanyModel>
          fnQuery={()=> companiesService.getAll()}
          onValueChange={({ _id }) => setValue("companyId", _id)}
          name="Companies"
          register={register}
          registerName="companyId"
          disabledOption="Select Company"
          defaultValue={companyId}
        />,
        <SelectInput<ProductModel, CategoryModel>
          fnQuery={()=> categoriesService.getAll()}
          onValueChange={handleCategoryChange}
          disabled={disableCategory}
          name="Categories"
          register={register}
          registerName="categoryId"
          disabledOption="Select Category"
          defaultValue={categoryId}
        />,
        <SelectInput<ProductModel, SubCategoryModel>
          disabled={!categoryId}
          fnQuery={() => {
            if (!categoryId) {
              return;
            }

            return categoriesService.getSubCategoriesByCategoryId(categoryId);
          }}
          onValueChange={({ _id }) => setValue("subCategoryId", _id)}
          name="SubCategories"
          register={register}
          registerName="subCategoryId"
          disabledOption="Select Sub Category"
          defaultValue={subCategoryId}
        />,
        <StringInput<ProductModel>
          label="Name"
          minLength={2}
          maxLength={50}
          name="name"
          registerName="name"
          type="text"
          register={register}
        />,
        <TextAreaInput<ProductModel>
          label="Description"
          minLength={5}
          name="description"
          registerName="description"
          register={register}
        />,
        <NumberInput<ProductModel>
          label="Price"
          min={0}
          max={2000}
          step="0.01"
          name="price"
          registerName="price"
          type="number"
          register={register}
        />,
        <NumberInput<ProductModel>
          label="Discount"
          min={0}
          max={2000}
          step="0.01"
          name="discount"
          registerName="discount"
          type="number"
          register={register}
        />,
        <ParentSelectStockComponent
          sizes={categoryId && sizes}
          disabled={!categoryId}
          setValue={setValue}
          stocks={stock}
          addStock={addStock}
          handleColorChange={(color, index) => {
            const stockArr = [...stock];
            stockArr[index].color = color;
            setValue("stock", stockArr);
          }}
          handleSizeChange={(size, index) => {
            const stockArr = [...stock];
            stockArr[index].size = size;
            setValue("stock", stockArr);
          }}
          handleQuantityChange={(quantity, index) => {
            const stockArr = [...stock];
            stockArr[index].quantity = quantity;
            setValue("stock", stockArr);
          }}
          onDelete={deleteStock}
        />,
        <ImageMultipleInput
          register={register}
          onChange={handleFileChange}
          imagesUrl={imagesUrl}
          required={imageRequired}
          multiple
        />,
      ]}
    />
  );
};
