import { AccessorySizeModel } from "./AccessorySizeModel"
import { ClothSizeModel } from "./ClothSizeModel"
import { ColorModel } from "./ColorModel"
import { ShoeSizeModel } from "./ShoeSizeModel"

export class StockModel {
  _id?: string
  color:ColorModel
  size:ClothSizeModel | ShoeSizeModel | AccessorySizeModel
  quantity:number
}