import { Ingredient } from "./ingredient-entity"
import { Size } from "./size-entity"

export type PizzaOrder = {
  id: string
  costumerName: string
  size: Size
  ingredients: Ingredient[]
  createdAt: Date
  finalPrice: number
}