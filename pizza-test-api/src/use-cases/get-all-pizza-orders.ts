import { PizzaOrdersRepository } from "@/repositories/pizza-orders-repository";

export class GetAllPizzaOrdersUseCase {
  constructor(private repository: PizzaOrdersRepository) { }
  
  async execute() {
    return this.repository.getAll()
  }
}