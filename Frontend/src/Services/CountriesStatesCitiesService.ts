import axios from "axios";

export type Country = {
  country_name: string;
  country_short_name: string;
  country_phone_code: string;
};

export type State = {
  state_name: string;
};

export type City = {
  city_name: string;
};

class CountriesStatesCities {
  public readonly apiKey =
    "7-kogt9aIvRH0_jFKVu5n4-XWiOnQAjt8Z6UU1_sni00SWHf1i7fXVY0MRY3gzExwsE";
  private readonly myEmail = "shlomi10000@gmail.com";

  public async getAccessToken(): Promise<string> {
    try {
      const response = await axios.get(
        "https://www.universal-tutorial.com/api/getaccesstoken",
        {
          headers: {
            Accept: "application/json",
            "api-token": this.apiKey,
            "user-email": this.myEmail,
          },
        }
      );
      return response.data.auth_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  }

  public readonly countries = `https://www.universal-tutorial.com/api/${this.apiKey}/`;
  public async getAllCountries(): Promise<Country[]> {
    try {
      const authToken = await this.getAccessToken();
      const response = await axios.get(
        "https://www.universal-tutorial.com/api/countries/",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
      const countries = response.data;
      return countries;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  public async getStatesForCountry(countryName: string): Promise<State[]> {
    try {
      if (countryName) {
        const authToken = await this.getAccessToken();
        const response = await axios.get(
          `https://www.universal-tutorial.com/api/states/${countryName}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: "application/json",
            },
          }
        );
        console.log(response.data);
        const states = response.data;
        return states;
      }
    } catch (error) {
      console.error(`Error fetching states for country ${countryName}:`, error);
    }
  }

  public async getCitiesForState(stateName: string): Promise<City[]> {
    try {
      const authToken = await this.getAccessToken();
      const response = await axios.get(
        `https://www.universal-tutorial.com/api/cities/${stateName}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
      const cities = response.data;
      return cities;
    } catch (error) {
      console.error(`Error fetching cities for state ${stateName}:`, error);
    }
  }
}

export const countriesStatesCities = new CountriesStatesCities();


