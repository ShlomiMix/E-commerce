import { RegisterOptions, useFormContext } from "react-hook-form";
import { OrderModel } from "../../../Models/OrderModel";
import "./PhoneInput.css";

interface PhoneProps {
  phonePrefix?: string;
  label: string;
  name: string;
  type: string;
  registerOptions: RegisterOptions;
  phoneNumberChange?: (value: string) => void;
}

export function PhoneInput({
  phonePrefix,
  label,
  name,
  type,
  registerOptions,
  phoneNumberChange,
}: PhoneProps): JSX.Element {
  const { setValue } = useFormContext<OrderModel>();

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {   
    setValue("shippingDetails.phone", `${phonePrefix}-${event.target.value}`)
  };

  return (
    <div className="PhoneInput">
      <label className="xxs:ml-4">{label}</label>
      <br />
      <span
        id="dropdown-phone-button"
        data-dropdown-toggle="dropdown-phone"
        className="flex-shrink-0 w-20 z-10 xxs:ml-6 inline-flex items-center h-10 py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
      >
        +{phonePrefix}
      </span>
      <input
        required
        type={type}
        onChange={handlePhoneChange}
        className="bg-black-200 appearance-none border-2 xxs:w-52 border-gray-200 rounded w-80 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      />
    </div>
  );
}
