import { ProductModel } from "../../../Models/ProductModel";

interface UseProductCardProp {
  product:ProductModel
}

export const useProductCard = ({product}:UseProductCardProp)=> {
    const getAllColorsWithSet = () => {
        const colorsSet = new Set();
        product?.stock.forEach((stock) => colorsSet.add(stock.color._id));
    
        // Convert the set back to an array and map it to the stock objects with unique colors
        const uniqueColors = [...colorsSet].map((colorId) =>
          product.stock.find((stock) => stock.color._id === colorId)
        );
    
        console.log(uniqueColors);
        return uniqueColors;
      };
    
      const getAllSizesWithSet = () => {
        const sizesSet = new Set();
        product.stock.forEach((stock) => sizesSet.add(stock.size._id));
    
        const uniqueSizes = [...sizesSet].map((sizeId) =>
          product.stock.find((stock) => stock.size._id === sizeId)
        );
    
        return uniqueSizes;
      };

      return {
        getAllColorsWithSet,
        getAllSizesWithSet
      }
}