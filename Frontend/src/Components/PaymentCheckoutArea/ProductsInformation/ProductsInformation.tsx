import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { OrderModel } from "../../../Models/OrderModel";
import { AppDispatch, useAppSelector } from "../../../Redux/Store";
import "./ProductsInformation.css";

export function ProductsInformation(): JSX.Element {
  const { watch } = useFormContext<OrderModel>();
  const [activeIndices, setActiveIndices] = useState<{ [key: string]: number }>(
    {}
  );

  const products = watch("items");

  const shippingCost =
    watch("orderDetails.shippingMethod") === "express" ? 30 : 10;

  const cart = useAppSelector((state) => state?.cart?.products);
  const dispatch: AppDispatch = useDispatch();

  const subtotal = Object.values(cart).reduce((acc, product) => {
    const totalPriceForProduct = product.product.price * product.amount;
    return acc + totalPriceForProduct;
  }, 0);

  const taxes = subtotal * 0.17;

  const handleNextImage = (productId: string, totalImages: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages,
    }));
  };

  const handlePrevImage = (productId: string, totalImages: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages,
    }));
  };



  return (
    <div className="ProductsInformation">
      <h2 className="mb-3">Order summary</h2>
      <hr />
      <div className="w-96 xxs:w-80  mt-1">
        <ul role="list" className=" divide-y h-auto divide-gray-500">
          {Object.entries(cart).map(([productId, product]) => (
            <li key={productId} className="flex flex-col py-6">
              <div className="relative h-80 w-full overflow-hidden rounded-lg md:h-96">
                {product?.product.imagesUrl?.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === (activeIndices[productId] || 0)
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    data-carousel-item={
                      index === (activeIndices[productId] || 0) ? "active" : ""
                    }
                  >
                    <img
                      src={imageUrl}
                      className="block  h-60 w-full  object-contain"
                      alt={`Product image ${index + 1}`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="absolute top-1/3 left-0 z-30 h-10 w-10 flex items-center justify-center transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none"
                  onClick={() =>
                    handlePrevImage(productId, product.product.imagesUrl.length)
                  }
                >
                  &lt;
                </button>
                <button
                  type="button"
                  className="absolute top-1/3 right-0 z-30 h-10 w-10 flex items-center justify-center transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none"
                  onClick={() =>
                    handleNextImage(productId, product.product.imagesUrl.length)
                  }
                >
                  &gt;
                </button>
              </div>

              <div className="ml-5 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#" className="text-slate-950 font-mono text-sm">
                        Name: {product.product.name}
                      </a>
                    </h3>
                    <p className="ml-4">
                      ${product.product.price * product.amount}
                    </p>
                  </div>
                  <p className="mt-1 text-slate-950 font-mono text-sm">
                    Color:{" "}
                    {product.product.stock
                      .map((stock) => stock.color.name)
                      .join(", ")}{" "}
                    &nbsp; <br /> Size:{" "}
                    {product.product.stock
                      .map((stock) => stock.size.name)
                      .join(", ")}
                  </p>
                  <p>Amount: {product.amount}</p>
                  <p className="">Price: {product.product.price}$</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mb-2 flex flex-col gap-y-2">
          <div className="flex justify-between px-1">
            <div>Subtotal</div>
            <div>${subtotal}</div>
          </div>

          <div className="flex justify-between px-1">
            <div>Shipping</div>
            <div>${shippingCost}</div>
          </div>

          <div className="flex justify-between px-1">
            <div>Taxes</div>
            <div>${(subtotal * 0.17).toFixed(2)}</div>
          </div>
          <hr />
        </div>
        <div className="flex justify-between px-1">
          <div>Total</div>
          <div>${subtotal + shippingCost + taxes}</div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-amber-400 text-slate-50 p-2 rounded-lg mt-5 transform hover:scale-90"
          >
            Confirm order
          </button>
        </div>
      </div>
    </div>
  );
}
