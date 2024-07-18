import {
    City,
    Country,
    State,
} from "../../../Services/CountriesStatesCitiesService";
import { useAddressData } from "../../hooks/CheckoutHooks/useAddressData";
import { PhoneInput } from "../PhoneInput/PhoneInput";
import { AddressSelectInput } from "../SelectInput/AddressSelectInput";
import { StringInput } from "../StringInput/StringInput";
import "./ShippingInformation.css";

export function ShippingInformation(): JSX.Element {
  const {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectedCity,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
  } = useAddressData();

  return (
    <div className="ShippingInformation">
      <h2 className="mb-3 mt-3 xxs:ml-5">Shipping information</h2>
      <hr />
      <StringInput
        label="Address"
        name="shippingDetails.address"
        type="string"
        registerOptions={{ minLength: 3, maxLength: 30, required: true }}
      />
      <StringInput
        label="Apartment"
        name="shippingDetails.apartment"
        type="string"
        registerOptions={{ minLength: 3, maxLength: 30, required: true }}
      />
      <AddressSelectInput<Country>
        label="Country"
        name="shippingDetails.country"
        onChange={handleCountryChange}
        defaultValue={selectedCountry}
        options={
          countries?.map((c) => ({
            country_name: c.country_name,
            country_phone_code: c.country_phone_code,
            country_short_name: c.country_short_name,
          })) || []
        }
        registerOptions={{ required: true }}
        fieldName="country_name"
      />
      <AddressSelectInput<State>
        label="State"
        name="shippingDetails.state"
        defaultValue={selectedState}
        onChange={handleStateChange}
        options={states?.map((s) => ({
          state_name: s.state_name,
        }))}
        fieldName="state_name"
        registerOptions={{ required: true }}
      />
      <AddressSelectInput<City>
        label="City"
        name="shippingDetails.city"
        defaultValue={selectedCity}
        onChange={handleCityChange}
        options={cities?.map((c) => ({
          city_name: c.city_name
        }))}
        fieldName="city_name"
        registerOptions={{ required: false }}
      />
      <StringInput
        label="Postal code"
        name="shippingDetails.postalCode"
        type="string"
        registerOptions={{ minLength: 4, maxLength: 20, required: true }}
      />

      <PhoneInput
        phonePrefix={selectedCountry?.country_phone_code}
        label="Phone"
        name={`shippingDetails.phone`}
        type="tel"
        registerOptions={{
          minLength: 8,
          maxLength: 20,
          required: { value: true, message: "Missing phone" },
        }}
        // phoneNumberChange={handlePhoneChange}
      />
    </div>
  );
}
