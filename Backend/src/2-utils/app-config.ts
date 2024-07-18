import dotenv from "dotenv";

// Load ".env" file into process.env object:
dotenv.config();

class AppConfig {
  public readonly isDevelopment = process.env.ENVIRONMENT === "development";
  public readonly isProduction = process.env.ENVIRONMENT === "production";
  public readonly port = process.env.PORT;
  public readonly mongodbConnectionString =
    process.env.MONGODB_CONNECTION_STRING;
  public readonly jwtSecretKey = process.env.JWT_SECRET_KEY;
  public readonly passwordSalt = process.env.PASSWORD_SALT;
  public readonly baseClothImageUrl = process.env.BASE_CLOTH_IMAGE_URL;
  public readonly baseShoeImageUrl = process.env.BASE_SHOE_IMAGE_URL;
  public readonly baseAccessoryImageUrl = process.env.BASE_ACCESSORY_IMAGE_URL;
  public readonly baseCategoryImageUrl = process.env.BASE_CATEGORY_IMAGE_URL;
  public readonly baseCompanyImageUrl = process.env.BASE_COMPANY_IMAGE_URL;
}

export const appConfig = new AppConfig();
