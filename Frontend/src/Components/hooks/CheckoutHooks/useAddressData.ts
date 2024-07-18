import { useEffect, useState } from "react";
import {
  City,
  Country,
  State,
  countriesStatesCities,
} from "../../../Services/CountriesStatesCitiesService";
import { notify } from "../../../Utils/Notify";

export const useAddressData = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedState, setSelectedState] = useState<State>();
  const [states, setStates] = useState<State[]>([]);
  const [selectedCity, setSelectedCity] = useState<City>();
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    console.log("Fetching all countries");
    countriesStatesCities
      .getAllCountries()
      .then((countries) => setCountries(countries))
      .catch((err) => notify.error(err));
  }, []);

  const getStatesByCountry = async (countryName: string) => {
    try {
      const states = await countriesStatesCities.getStatesForCountry(
        countryName
      );
      setStates(states);
    } catch (err: any) {
      notify.error(err);
    }
  };

  const getCitiesByState = async (stateName: string) => {
    try {
      const cities = await countriesStatesCities.getCitiesForState(stateName);
      cities?.length === 0
        ? setCities([{city_name: stateName}])
        : setCities(cities);
    } catch (err: any) {
      notify.error(err);
    }
  };

  const handleCountryChange = async (selectedOption: Country) => {
    const { country_name, country_phone_code, country_short_name } =
      selectedOption;
    setSelectedCountry({
      country_name,
      country_phone_code,
      country_short_name,
    });
    setSelectedState(null);
    setSelectedCity(null);
    await getStatesByCountry(selectedOption.country_name);
  };

  const handleStateChange = async (selectedOption: State) => {
    setSelectedState(selectedOption);
    await getCitiesByState(selectedOption.state_name);
  };

  const handleCityChange = async (selectedOption: City) => {
    await getCitiesByState(selectedOption.city_name);
    setSelectedCity(selectedOption);
  };

  return {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectedCity,
    getStatesByCountry,
    getCitiesByState,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
  };
};
