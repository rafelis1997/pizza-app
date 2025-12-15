import { Ingredient } from "../entities/ingredient-entity";
import { IngredientsRepository } from "../ingredients-repository";

export class InMemoryIngredientsRepository implements IngredientsRepository {
  public items: Ingredient[] = [
    {
      id: "1",
      extraPrice: 5000,
      name: "cheese"
    },
    {
      id: "2",
      extraPrice: 10000,
      name: "pepperoni"
    },
    {
      id: "3",
      extraPrice: 8000,
      name: "olive"
    },
    {
      id: "4",
      extraPrice: 15000,
      name: "chicken"
    },
    {
      id: "5",
      extraPrice: 3000,
      name: "tomatoes"
    },
    {
      id: "6",
      extraPrice: 4000,
      name: "corn"
    },
  ]

  async getAll(): Promise<Ingredient[]> {
    return this.items
  }

  async findAllByIds(ids: string[]) {
    const findItems = ids.reduce<{
      found: Ingredient[]
      notFound: string[]
    }>((acc, cur) => {
      if (this.items.some(item => item.id === cur)) {
        acc.found.push(this.items.find(item => item.id === cur)!)
        return acc
      }
      acc.notFound.push(cur)
      return acc
     }, {
      found: [],
      notFound: []
    })

    return findItems
  }
}