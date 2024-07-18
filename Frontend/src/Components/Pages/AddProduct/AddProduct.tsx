// import  GenericForm  from "../../FormArea/GenericForm/GenericForm";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import { productsService } from "../../../Services/ProductsService";
import { notify } from "../../../Utils/Notify";
import { ProductForm } from "../../Forms/ProductForm/ProductForm";
import { useImagesChange } from "../../hooks/formUtils";
import "./AddProduct.css";

export function AddProduct(): JSX.Element {
  const navigate = useNavigate();
  const { imagesFiles, imagesUrl, handleFileChange, setImagesUrl } =
    useImagesChange();

  async function addProduct(product: ProductModel): Promise<void> {
    try {
      if (imagesFiles) {
        product.images = imagesFiles;
      }
      await productsService.addProduct(product);
      notify.success("Product has been added");
      navigate("/products");
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <div className="AddProduct">
      <ProductForm
        submit={addProduct}
        imageRequired
        disableCategory={false}
        handleFileChange={handleFileChange}
        imagesFiles={imagesFiles}
        imagesUrl={imagesUrl}
        setImagesUrl={setImagesUrl}
      />
    </div>
  );
}
