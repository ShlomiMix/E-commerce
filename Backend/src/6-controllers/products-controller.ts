import express, { NextFunction, Request, Response } from "express";
import mongoose, { FilterQuery } from "mongoose";
import { imagesHandler } from "../2-utils/imagesHandler";
import { StatusCode } from "../3-models/enums";
import {
  ClothModel,
  IAccessoryModel,
  IClothModel,
  IProductModel,
  IShoeModel,
  ProductModel,
  ShoeModel,
} from "../3-models/product-model";

import { CategoryModel } from "../3-models/category-model";
import { AccessoryModel } from "../3-models/product-model";
import {
  accessoriesService,
  clothesService,
  productsService,
  shoesService,
} from "../5-services/generic-service";
import { ValidationError } from "../3-models/client-errors";

class ProductsController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get("/products", this.getAllProductsByFilterQuery);
    this.router.get("/products/:_id([a-f0-9A-F]{24})", this.getOneProduct);
    this.router.post("/products", this.addProduct);
    this.router.put("/products/:_id([a-f0-9A-F]{24})", this.updateProduct);
    this.router.delete("/products/:_id([a-f0-9A-F]{24})", this.deleteProduct);
    this.router.get(
      "/brands/images/:folderPath/:imageName",
      imagesHandler.getImageFile
    );
  }

  private async getAllProductsByFilterQuery(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        page = 1,
        audienceId,
        categoryId,
        color,
        companyId,
        size,
        subCategoryId,
        name,
         price
      } = request?.query as {
        page?: string,
      audienceId?: string,
      categoryId?: string,
      color?: string | string[],
      companyId?: string,
      size?: string | string[],
      subCategoryId?: string,
      name?: string,
       price:string

  
      };

      console.log("Request Query:", request.query);

      const filtersQueryShoes: FilterQuery<IShoeModel> = {};
      const filtersQueryClothes: FilterQuery<IClothModel> = {};
      const filtersQueryAccessories: FilterQuery<IAccessoryModel> = {};

      if(name) {
        const nameRegex = new RegExp(name.toString(), "i")
        filtersQueryClothes.name = nameRegex
        filtersQueryShoes.name = nameRegex
        filtersQueryAccessories.name = nameRegex
      }

      if (audienceId) {
        filtersQueryShoes.audienceId = audienceId;
        filtersQueryClothes.audienceId = audienceId;
        filtersQueryAccessories.audienceId = audienceId;
      }
      if (categoryId) {
        filtersQueryShoes.categoryId = categoryId;
        filtersQueryClothes.categoryId = categoryId;
        filtersQueryAccessories.categoryId = categoryId;
      }

      if (subCategoryId) {
        filtersQueryShoes.subCategoryId = subCategoryId;
        filtersQueryClothes.subCategoryId = subCategoryId;
        filtersQueryAccessories.subCategoryId = subCategoryId;
      }

      if (color) {
        const colorIds = typeof color === 'string' ? color.split(",") : color;
        const objectIdColorIds = colorIds.map(c => new mongoose.Types.ObjectId(c.trim()));
        filtersQueryShoes["stock.color"] = { $in: objectIdColorIds };
        filtersQueryClothes["stock.color"] = { $in: objectIdColorIds };
        filtersQueryAccessories["stock.color"] = { $in: objectIdColorIds };
      }

      if (companyId) {
        filtersQueryShoes.companyId = companyId;
        filtersQueryClothes.companyId = companyId;
        filtersQueryAccessories.companyId = companyId;
      }
      if (size) {
        const sizeIds = typeof size === "string" ? size.split(",") : size
        const objectIdSizeIds = sizeIds.map((s)=> new mongoose.Types.ObjectId(s.trim()))
        filtersQueryShoes["stock.size"] = {$in: objectIdSizeIds};
        filtersQueryClothes["stock.size"] = {$in: objectIdSizeIds};
        filtersQueryAccessories["stock.size"] = {$in: objectIdSizeIds};
      }

      if (price) {
        const [minPriceStr, maxPriceStr] = price.split(",");
        let minPrice = parseFloat(minPriceStr);
        let maxPrice = parseFloat(maxPriceStr);
        filtersQueryClothes.price = { $gte: minPrice, $lte: maxPrice };
        filtersQueryShoes.price = { $gte: minPrice, $lte: maxPrice };
        filtersQueryAccessories.price = { $gte: minPrice, $lte: maxPrice };
      }

    

      const products = await productsService.getAllProductsByFilterQuery(
        filtersQueryClothes,
        filtersQueryShoes,
        filtersQueryAccessories,
        +page
      );

      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }

  private async getOneProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = request.params;

      const productById = await ProductModel.findById(_id).exec();

      if (!productById) {
        throw new Error("Product not found");
      }

      const categoryId = productById?.categoryId;

      const category = await CategoryModel.findById(categoryId).exec();

      if (!category) {
        throw new Error("can't find category");
      }
      const categoryName = category?.name;

      let product: IProductModel;

      switch (categoryName) {
        case "Clothing":
          product = await clothesService.getOne(_id);
          console.log("cloth", product);
          console.log("categoryName", categoryName);

          break;
        case "Footwear":
          product = await shoesService.getOne(_id);
          console.log("shoe", product);
          console.log("categoryName", categoryName);
          break;
        case "Accessories":
          product = await accessoriesService.getOne(_id);
          console.log("accessory", product);
          console.log("categoryName", categoryName);
          break;

        default:
          throw new Error("Can't find this category");
      }

      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }

  private async addProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { categoryId } = request.body;
      const category = await CategoryModel.findById(categoryId).exec();
      console.log("category", category);

      const imagesArr = await imagesHandler.extractImagesFromRequest(request);
      let categoryName = category?.name;

      console.log("Request body", request.body);

      const stock = [];
      let index = 0;
      while (request.body[`stock[${index}][color]`] !== undefined) {
        stock.push({
          color: request.body[`stock[${index}][color]`],
          size: request.body[`stock[${index}][size]`],
          quantity: request.body[`stock[${index}][quantity]`],
        });
        index++;
      }

      request.body.stock = stock;

      let addedProduct: IProductModel;
      console.log("categoryName", categoryName);

      switch (categoryName) {
        case "Clothing":
          const cloth = new ClothModel(request.body);
          addedProduct = await clothesService.addOne({
            product: cloth,
            images: imagesArr,
          });
          break;

        case "Footwear":
          const shoe = new ShoeModel(request.body);
          addedProduct = await shoesService.addOne({
            product: shoe,
            images: imagesArr,
          });
          break;

        case "Accessories":
          const accessory = new AccessoryModel(request.body);
          console.log("accessory", accessory);

          addedProduct = await accessoriesService.addOne({
            product: accessory,
            images: imagesArr,
          });
          break;

        default:
          response.status(StatusCode.BadRequest).send("Invalid category name");
          return;
      }
      console.log("addedProduct", addedProduct);

      response.status(StatusCode.Created).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }

  private async updateProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = request.params;
      console.log("_id", _id);

      const { categoryId } = request.body;
      const category = await CategoryModel.findById(categoryId).exec();

      console.log("category", category);

      const imagesArr =
        request.files !== null
          ? await imagesHandler.extractImagesFromRequest(request)
          : [];

      const stock = [];
      let index = 0;
      while (request.body[`stock[${index}][color]`] !== undefined) {
        stock.push({
          color: request.body[`stock[${index}][color]`],
          size: request.body[`stock[${index}][size]`],
          quantity: request.body[`stock[${index}][quantity]`],
        });
        index++;
      }

      request.body.stock = stock;

      request.body._id = _id;
      let categoryName = category?.name;
      console.log("categoryName", categoryName);
      let updatedProduct: IProductModel;

      switch (categoryName) {
        case "Clothing":
          const cloth = new ClothModel(request.body);

          updatedProduct = await clothesService.updateOne({
            product: cloth,
            images: imagesArr,
          });
          console.log("cloth", cloth);
          break;

        case "Footwear":
          const shoe = new ShoeModel(request.body);
          updatedProduct = await shoesService.updateOne({
            product: shoe,
            images: imagesArr,
          });
          console.log("shoe", shoe);
          break;

        case "Accessories":
          const accessory = new AccessoryModel(request.body);
          updatedProduct = await accessoriesService.updateOne({
            product: accessory,
            images: imagesArr,
          });
          console.log("accessory", accessory);
          break;

        default:
          response.status(StatusCode.BadRequest).send("Invalid category name");
          return;
      }

      console.log("updatedProductController", updatedProduct);

      response.json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }

  private async deleteProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await productsService.deleteOne(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const productsController = new ProductsController();
export const productsRouter = productsController.router;
