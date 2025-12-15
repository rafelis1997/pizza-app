import { PizzaOrder } from "../entities/pizza-orders-entity";
import { PizzaOrdersRepository } from "../pizza-orders-repository";

export class InMemoryPizzaOrdersRepository implements PizzaOrdersRepository {
  public items: PizzaOrder[] = []

  async create(order: PizzaOrder) {
    this.items.push(order)
    return this.items[this.items.length - 1]
  }
  async getAll() {
    return this.items
  }
  async findById(id: string) {
    return this.items.find(item => item.id === id)
  }
}