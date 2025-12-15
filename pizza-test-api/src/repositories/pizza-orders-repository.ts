import { PizzaOrder } from "./entities/pizza-orders-entity";

export interface PizzaOrdersRepository {
  create(order: PizzaOrder): Promise<PizzaOrder>
  getAll(): Promise<PizzaOrder[]>
  findById(id: string): Promise<PizzaOrder | undefined>
}