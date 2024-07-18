import { UploadedFile } from "express-fileupload";
import { FilterQuery, Model } from "mongoose";
import { imagesHandler } from "../2-utils/imagesHandler";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import {
  AccessoryModel,
  ClothModel,
  IAccessoryModel,
  IClothModel,
  IProductModel,
  IShoeModel,
  ProductModel,
  ShoeModel,
} from "../3-models/product-model";

export interface Product<T> {
  product: T;
  images: UploadedFile[];
}

export class Service<T extends IProductModel> {
  protected model: Model<T>;
  protected populatedFields: string[];

  public constructor(model: Model<T>, populatedFields: string[]) {
    this.model = model;
    this.populatedFields = populatedFields;
  }

  public async getOne(_id: string): Promise<T> {
    const getOne = await this.model
      .findById(_id)
      .populate(this.populatedFields)
      .exec();
    return getOne;
  }

  public async addOne<T extends IProductModel>({
    product,
    images,
  }: Product<T>): Promise<T> {
    const errors = product.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }

    imagesHandler.configureFileSaver(
      "1-assets",
      `${this.model.modelName.toLowerCase()}-images`
    );
    const imagesNames = await imagesHandler.AddImageNames(images);
    product.imageNames = imagesNames;
    const addedProduct = await this.model.create(product);
    const addedProductId = addedProduct._id; // Convert _id to string
    const productInstance = (await this.getOne(addedProductId)).toObject(); // Asserting type T

    return productInstance;
  }

  public async updateOne<T extends IProductModel>({
    product,
    images,
  }: Product<T>): Promise<T> {
    const errors = product.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }

    console.log("Product", product);

    imagesHandler.configureFileSaver(
      "1-assets",
      `${this.model.modelName.toLocaleLowerCase()}-images`
    );

    const newImagesName = await imagesHandler.updateImageNames(
      this.model,
      product._id,
      images
    );

    // product.imageNames = newImagesName;

    const updateData: Partial<T> & { _id: string } = {
      ...product.toObject(),
      imageNames: newImagesName,
      _id: product._id.toString(),
    };

    const updatedProduct = await this.model
      .findByIdAndUpdate(product._id, updateData, { new: true })
      .exec();

    console.log("updatedProduct", updatedProduct);

    if (!updatedProduct) {
      throw new ResourceNotFoundError(product._id);
    }

    return (await this.getOne(product._id)).toObject() as T;
  }
}

export interface IProducts {
  clothes: IClothModel[];
  shoes: IShoeModel[];
  accessories: IAccessoryModel[];
}

class ProductsService extends Service<IProductModel> {
  public constructor() {
    super(ProductModel, [
      "category",
      "company",
      "audience",
      "stock",
      "stock.color",
      "stock.size",
      "stock.quantity",
      "subCategory",
    ]);
  }

  public async getAllProductsByFilterQuery(
    filterQueryClothes: FilterQuery<IClothModel>,
    filterQueryShoes: FilterQuery<IShoeModel>,
    filterQueryAccessories: FilterQuery<IAccessoryModel>,
    page: number = 1
  ): Promise<{ products: IProducts; totalRows?: number }> {
    const itemsPerPage = 9;
    const offset = (page - 1) * itemsPerPage;

    const products: IProducts = {
      clothes: [],
      shoes: [],
      accessories: [],
    };

    const clothes = await ClothModel.find(filterQueryClothes)
      .skip(offset)
      .limit(itemsPerPage)
      .populate(this.populatedFields)

      .exec();

    const shoes = await ShoeModel.find(filterQueryShoes)
      .skip(offset)
      .limit(itemsPerPage)
      .populate(this.populatedFields)
      .exec();

    const accessories = await AccessoryModel.find(filterQueryAccessories)
      .skip(offset)
      .limit(itemsPerPage)
      .populate(this.populatedFields)
      .exec();

    products.clothes = clothes;
    products.shoes = shoes;
    products.accessories = accessories;

    console.log("clothes", products.clothes);
    console.log("shoes", products.shoes);
    console.log("accessories", products.accessories);

    const totalRowsClothes = await ClothModel.countDocuments(
      filterQueryClothes
    );
    const totalRowsShoes = await ShoeModel.countDocuments(filterQueryShoes);
    const totalRowsAccessories = await AccessoryModel.countDocuments(
      filterQueryAccessories
    );
    const totalRows = totalRowsClothes + totalRowsShoes + totalRowsAccessories;
    return { products, totalRows };
  }

  public async deleteOne(_id: string): Promise<void> {
    const product = await this.model.findById(_id).exec();
    if (!product) {
      throw new ResourceNotFoundError(_id);
    }

    await ProductModel.findByIdAndDelete(_id);
  }
}

export const productsService = new ProductsService();

export const clothesService = new Service<IClothModel>(ClothModel, [
  "category",
  "company",
  "audience",
  "subCategory",
  "stock",
  "stock.color",
  "stock.size",
  "stock.quantity",
]);

export const shoesService = new Service<IShoeModel>(ShoeModel, [
  "category",
  "company",
  "audience",
  "subCategory",
  "stock",
  "stock.color",
  "stock.size",
  "stock.quantity",
]);

export const accessoriesService = new Service<IAccessoryModel>(AccessoryModel, [
  "category",
  "company",
  "audience",
  "subCategory",
  "stock",
  "stock.color",
  "stock.size",
  "stock.quantity",
]);
