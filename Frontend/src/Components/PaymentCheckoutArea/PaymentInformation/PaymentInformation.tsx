import { useFormContext } from "react-hook-form";
import { OrderModel } from "../../../Models/OrderModel";
import { DatePickerSelect } from "../DatePickerSelect/DatePickerSelect";
import { StringInput } from "../StringInput/StringInput";
import "./PaymentInformation.css";

export function PaymentInformation(): JSX.Element {
  const { register, watch } = useFormContext<OrderModel>();

  const paymentMethod = watch("customerCard.paymentMethod");
  return (
    <>
      <div className="PaymentInformation">
        <h2>Payment</h2>
        <hr />
        <fieldset>
          <legend>Payment type</legend>
          <div>
            <div>
              <input
                name="creditCard"
                type="radio"
                value={"credit-card"}
                {...register("customerCard.paymentMethod")}
                checked={paymentMethod === "credit-card"}
              />
              <label htmlFor="credit-card">Credit card</label>
            </div>
            <div>
              <input
                name="paypal"
                type="radio"
                value={"paypal"}
                {...register("customerCard.paymentMethod")}
                checked={paymentMethod === "paypal"}
              />
              <label htmlFor="paypal">PayPal</label>
            </div>
          </div>
        </fieldset>
        <StringInput
          label="Card number"
          name="customerCard.cardNumber"
          type="string"
          registerOptions={{
            minLength: 12,
            maxLength: 20,
            required: { value: true, message: "Missing card number" },
          }}
        />
        <StringInput
          label="Name on card"
          name="customerCard.nameOnCard"
          type="string"
          registerOptions={{
            maxLength: 20,
            required: { value: true, message: "Missing name on card" },
          }}
        />
        <DatePickerSelect<OrderModel>
          name="customerCard.expirationDate"
          registerOptions={{
            required: { value: true, message: "Missing card expiration date" },
          }}
        />
        <StringInput
          label="CVV"
          name="customerCard.cvv"
          type="string"
          registerOptions={{
            required: { value: true, message: "Missing expiration date" },
          }}
        />
      </div>
    </>
  );
}
