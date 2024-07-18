import { useEffect, useState } from "react";
import { useProductDetails } from "../../hooks/ProductDetailsHooks/useProductDetails";
import "./ProductDetails.css";

export function ProductDetails(): JSX.Element {
  const {
    getAllColorsWithSet,
    getAllSizesWithSet,
    getSubCategoryName,
    handleAddToCart,
    handleColorSelect,
    handleNext,
    handlePrev,
    setSelectedSize,
    navigateByAudienceId,
    navigateByCategoryId,
    navigateByCompanyId,
    navigateBySubCategoryId,
    selectedColor,
    selectedSize,
    product,
    activeIndex,
  } = useProductDetails();

  const [isProductAvailable, setIsProductAvailable] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    checkAvailability();
  }, [selectedColor, selectedSize]);

  const checkAvailability = () => {
    if (selectedColor && selectedSize) {
      const selectedStock = product?.stock?.find(
        (stock) =>
          stock.color._id === selectedColor && stock.size._id === selectedSize
      );
      setIsProductAvailable(selectedStock ? selectedStock.quantity > 0 : false);
    } else {
      setIsProductAvailable(null); // Or any default state
    }
  };

  return (
    <div className="ProductDetails">
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex pl-2 justify-start">
            <button
              className="font-bold -mt-4"
              onClick={() => navigateByAudienceId(product?.audienceId)}
            >
              {product?.audience?.name}&nbsp;/&nbsp;
            </button>
            <button
              className="font-bold -mt-4"
              onClick={() => navigateByCategoryId(product?.categoryId)}
            >
              {product?.category?.name}&nbsp;/&nbsp;
            </button>
            <button
              className="font-bold -mt-4"
              onClick={() => navigateBySubCategoryId(product?.subCategoryId)}
            >
              {getSubCategoryName()}&nbsp;/&nbsp;
            </button>
            <button
              className="font-bold -mt-4"
              onClick={() => navigateByCompanyId(product?.companyId)}
            >
              {product?.company?.name}
            </button>
          </div>
          <div className="flex flex-col md:flex-row mt-3 -mx-4">
            <div className="md:flex-1 px-4">
              <div
                id="controls-carousel"
                className="relative w-full"
                data-carousel="static"
              >
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                  {product?.imagesUrl?.map((imageUrl, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === activeIndex ? "opacity-100" : "opacity-0"
                      }`}
                      data-carousel-item={index === activeIndex ? "active" : ""}
                    >
                      <img
                        src={imageUrl}
                        className="block w-full h-full object-cover"
                        alt={`Product image ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  onClick={handlePrev}
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 border-2 border-gray-950 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                      className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="red"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                    <span className="sr-only">Previous</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  onClick={handleNext}
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-950 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                      className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="red"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="sr-only">Next</span>
                  </span>
                </button>
              </div>
              <div className="flex -mx-2 mb-4 mt-2">
                <div className="w-1/2 px-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {product?.name}
              </h2>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:&nbsp;
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {product?.price}$
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {isProductAvailable ? "In Stock" : "Out Of Stock"}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Color:
                </span>
                <div className="flex items-center mt-2">
                  {getAllColorsWithSet()?.map((stock, index) => (
                    <button
                      onClick={() => handleColorSelect(stock.color._id)}
                      key={index}
                      value={stock.color._id}
                      style={{ backgroundColor: stock?.color?.hexCode }}
                      className={`w-10 h-10 rounded-full border-2 dark:bg-gray-200 mr-2 ${
                        selectedColor === stock.color._id
                          ? "border-4 border-blue-600"
                          : ""
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
              {selectedColor && (
                <div className="mb-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Select Size:
                  </span>
                  <div className="flex items-center mt-2 flex-wrap gap-y-1">
                    {getAllSizesWithSet()?.map((stock, index) => (
                      <button
                        disabled={stock.quantity === 0}
                        key={index}
                        onClick={() => setSelectedSize(stock.size._id)}
                        value={stock.size._id}
                        className={`w-10 h-10 rounded-full relative border-2 dark:bg-gray-200 mr-2 ${
                          selectedSize === stock.size._id
                            ? "border-4 border-blue-600"
                            : ""
                        } ${
                          stock.quantity === 0
                            ? "opacity-80 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {stock.size.name}
                        {stock.quantity === 0 && (
                          <span className="diagonal-line">\</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
