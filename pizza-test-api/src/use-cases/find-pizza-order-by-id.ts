import { PizzaOrdersRepository } from "@/repositories/pizza-orders-repository";
import { NotFoundError } from "./errors/not-found-error";

export class FindPizzaOrderByIdUseCase {
  constructor(private repository: PizzaOrdersRepository) { }
  
  async execute(id: string) {
    const order = await this.repository.findById(id)
    if (!order) {
      throw new NotFoundError()
    }
    return order
  }
}