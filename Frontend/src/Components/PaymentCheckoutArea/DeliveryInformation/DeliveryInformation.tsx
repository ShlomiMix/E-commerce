import { useFormContext } from "react-hook-form";
import { OrderModel } from "../../../Models/OrderModel";
import "./DeliveryInformation.css";

export function DeliveryInformation(): JSX.Element {
  const { register, watch } = useFormContext<OrderModel>();
  const shippingCost = watch("orderDetails.shippingMethod");
  return (
    <>
      <h2 className="mb-1 mt-3 xxs:ml-5">Delivery method</h2>
      <hr className="mb-2" />
      <div className="flex justify-around gap-x-2">
        <div className="flex items-center justify-center w-40  border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-radio-1"
            type="radio"
            value="standard"
            name="bordered-radio"
            {...register("orderDetails.shippingMethod")}
            checked={shippingCost === "standard"}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          />
          <label
            htmlFor="bordered-radio-1"
            className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Standard <span className="text-xs">7-14 days shipping 10$</span>
          </label>
        </div>
        <div className="flex w-40 items-center justify-center border border-gray-200 rounded dark:border-gray-700">
          <input
            checked={shippingCost === "express"}
            id="bordered-radio-2"
            type="radio"
            value="express"
            name="bordered-radio"
            {...register("orderDetails.shippingMethod")}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          />
          <label
            htmlFor="bordered-radio-2"
            className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Express <span className="text-xs">2-5 days shipping 30$</span>
          </label>
        </div>
      </div>
    </>
  );
}
