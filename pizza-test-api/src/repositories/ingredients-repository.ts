import { Ingredient } from "./entities/ingredient-entity"

export interface IngredientsRepository {
  getAll(): Promise<Ingredient[]>
  findAllByIds(ids: string[]): Promise<{
    found: Ingredient[]
    notFound: string[]
  }>
}