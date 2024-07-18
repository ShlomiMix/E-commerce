import { useNavigate, useParams } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import { productsService } from "../../../Services/ProductsService";
import { notify } from "../../../Utils/Notify";
import { ProductForm } from "../../Forms/ProductForm/ProductForm";
import { useImagesChange } from "../../hooks/formUtils";
import "./EditProduct.css";

export function EditProduct(): JSX.Element {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { imagesFiles, imagesUrl, handleFileChange, setImagesUrl } =
    useImagesChange();

  async function updateProduct(product: ProductModel): Promise<void> {
    try {
      if (imagesFiles) {
        product.images = imagesFiles;
      }
      product._id = _id;
      await productsService.updateProduct(product);
      notify.success("Product has been updated");
      navigate("/products");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="EditProduct">
      <ProductForm
        disableCategory
        submit={updateProduct}
        imageRequired={false}
        handleFileChange={handleFileChange}
        imagesFiles={imagesFiles}
        imagesUrl={imagesUrl}
        setImagesUrl={setImagesUrl}
      />
    </div>
  );
}
