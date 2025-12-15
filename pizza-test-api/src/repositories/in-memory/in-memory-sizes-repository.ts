import { Size } from "../entities/size-entity";
import { SizesRepository } from "../size-repository";

export class InMemorySizesRepository implements SizesRepository {
  public items: Size[] = [
    {
      id: "1",
      basePrice: 3000,
      name: "sm"
    },
    {
      id: "2",
      basePrice: 5000,
      name: "md"
    },
    {
      id: "3",
      basePrice: 7000,
      name: "lg"
    },
    {
      id: "4",
      basePrice: 9000,
      name: "xl"
    },
  ]

  async getAll(): Promise<Size[]> {
    return this.items
  }

  async findById(id: string) {
    const findItems = this.items.find(item => item.id === id)

    return findItems
  }
}