import { UnknownAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CategoryModel } from "../Models/CategoryModel";
import { AppState } from "../Redux/AppState";
import { appStore } from "../Redux/Store";
import { notify } from "../Utils/Notify";

type DispatchFunction<T> = (item: T) => UnknownAction;
type GetSubCategoriesFunction = (id: string) => Promise<CategoryModel[]>;

export class GenericService<T> {
  private readonly model: T;
  private readonly key?: keyof AppState;
  public readonly baseUrl: string;
  public readonly _id: keyof T;
  public readonly getSubCategoriesByCategoryId?: GetSubCategoriesFunction;

  public constructor(
    model: T,
    baseUrl: string,
    _id: keyof T,
    private setAction?: DispatchFunction<T[]>,
    private addAction?: DispatchFunction<T>,
    private updateAction?: DispatchFunction<T>,
    private deleteAction?: DispatchFunction<string>,
    getSubCategoriesByCategoryId?: GetSubCategoriesFunction,
    key?: keyof AppState
  ) {
    this.model = model;
    if (!baseUrl) {
      throw new Error("Base URL is required");
    }
    this.key = key;
    this.baseUrl = baseUrl;
    this._id = _id;
    this.getSubCategoriesByCategoryId = getSubCategoriesByCategoryId;
  }

  public async getAll(): Promise<T[]> {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }

      console.log("baseUrlGetAll", this?.baseUrl);

      const values = appStore.getState()[this.key] as unknown as T[];
      if (values && values.length > 0) {
        return values;
      }
      console.log("values", values);

      const response = await axios.get<T[]>(this.baseUrl);
      if (!response) {
        throw new Error("Failed to fetch data");
      }
      const all = response.data;

      if (this.setAction) {
        appStore.dispatch(this.setAction(all));
      }

      console.log(all);

      return all;
    } catch (err: any) {
      notify.error(err);
    }
  }

  public async getOne(_id: string): Promise<T> {
    try {
      const response = await axios.get<T>(this.baseUrl + _id);
      const one = response.data;
      return one;
    } catch (err: any) {
      console.log(err);
    }
  }

  public async addOne(model: T): Promise<void> {
    try {
      const formData = this.createFormData(model);
      const response = await axios.post<T>(this.baseUrl, formData);
      const addedOne = response.data;
      if (this.addAction) {
        appStore.dispatch(this.addAction(addedOne));
      }
      console.log(addedOne);
    } catch (err: any) {
      console.log(err);
    }
  }

  public async updateOne(model: T): Promise<void> {
    try {
      const formData = this.createFormData(model);
      const response = await axios.put<T>(
        this.baseUrl + (model as T)[this._id],
        formData
      );
      const updatedOne = response.data;
      if (this.updateAction) {
        appStore.dispatch(this.updateAction(updatedOne));
      }
      console.log(updatedOne);
    } catch (err: any) {
      console.log(err);
    }
  }

  public async deleteOne(_id: Partial<T> & string): Promise<void> {
    try {
      await axios.delete<T>(this.baseUrl + _id);
      if (this.deleteAction) {
        appStore.dispatch(this.deleteAction(_id));
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  private createFormData(model: T): FormData {
    const formData = new FormData();
    Object.entries(model).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item: any) => {
          formData.append(`${key}`, item._id);
        });
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  }
}
