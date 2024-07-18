import { StringInput } from "../StringInput/StringInput";
import "./CustomerInformation.css";

export function CustomerInformation(): JSX.Element {
  return (
    <div className="CustomerInformation">
      <h2 className="mb-3 xxs:ml-5">Contact information</h2>
      <hr/>
      <StringInput
        label="Email"
        name="customer.email"
        type="email"
        registerOptions={{ minLength: 7, maxLength: 50, required: {value:true, message: "Missing email"} }}
      />
      <StringInput
        label="First name"
        name="customer.firstName"
        type="string"
        registerOptions={{ minLength: 2, maxLength: 50, required: true }}
      />
      <StringInput
        label="Last name"
        name="customer.lastName"
        type="string"
        registerOptions={{ minLength: 2, maxLength: 50, required: true }}
      />
    </div>
  );
}
