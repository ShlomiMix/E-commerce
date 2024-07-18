import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ProductModel } from "../../../Models/ProductModel";
import { addToCart } from "../../../Redux/CartSlice";
import { AppDispatch } from "../../../Redux/Store";
import { productsService } from "../../../Services/ProductsService";
import { notify } from "../../../Utils/Notify";

export const useProductDetails = () => {
  const [product, setProduct] = useState<ProductModel>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(null);
  const [selectedSize, setSelectedSize] = useState<string>(null);
  const [availableSizes, setAvailableSizes] = useState<any[]>([]);
  const { _id } = useParams();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    productsService
      .getOneProduct(_id)
      .then((product) => setProduct(product))
      .catch((err) => notify.error(err));
  }, [_id]);

  function getSubCategoryName(): string {
    return product?.subCategory?.name || "Unknown Subcategory";
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === (product?.imagesUrl?.length || 1) - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? (product?.imagesUrl?.length || 1) - 1 : prevIndex - 1
    );
  };

  const getAllColorsWithSet = () => {
    const colorsSet = new Set();
    product?.stock.forEach((stock) => colorsSet.add(stock.color._id));

    const uniqueColors = [...colorsSet].map((colorId) =>
      product.stock.find((stock) => stock.color._id === colorId)
    );

    return uniqueColors;
  };

  const getAllSizesWithSet = () => {
    const sizesSet = new Set();
    availableSizes.forEach((stock) => sizesSet.add(stock.size._id));

    const uniqueSizes = [...sizesSet].map((sizeId) =>
      product.stock.find((stock) => stock.size._id === sizeId)
    );

    return uniqueSizes;
  };

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId);
    setSelectedSize(null);
    const sizes = product?.stock.filter((stock) => stock.color._id === colorId);
    setAvailableSizes(sizes);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      notify.error("Please select both a color and a size");
      return;
    }

    const selectedStock = product?.stock.find(
      (stock) =>
        stock?.color?._id === selectedColor && stock?.size?._id === selectedSize
    );
    const newProduct = { ...product, stock: [selectedStock] };
    console.log(selectedStock?._id);
    dispatch(addToCart({ product: newProduct, stockId: selectedStock?._id }));
  };

  const navigate = useNavigate();

  const navigateByAudienceId = (audienceId: string): void => {
    navigate(`/products?audienceId=${audienceId}`);
  };

  const navigateByCategoryId = (categoryId: string): void => {
    navigate(`/products?categoryId=${categoryId}`);
  };

  const navigateBySubCategoryId = (subCategoryId: string): void => {
    navigate(`/products?subCategoryId=${subCategoryId}`);
  };

  const navigateByCompanyId = (companyId: string): void => {
    navigate(`/products?companyId=${companyId}`);
  };

  return {
    getSubCategoryName,
    handleNext,
    handlePrev,
    getAllColorsWithSet,
    getAllSizesWithSet,
    handleColorSelect,
    handleAddToCart,
    setSelectedSize,
    navigateByAudienceId,
    navigateByCategoryId,
    navigateBySubCategoryId,
    navigateByCompanyId,
    selectedColor,
    selectedSize,
    product,
    activeIndex,
  };
};
