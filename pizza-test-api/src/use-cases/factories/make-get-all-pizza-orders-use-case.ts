import { InMemoryPizzaOrdersRepository } from "@/repositories/in-memory/in-memory-pizza-orders-repository";
import { GetAllPizzaOrdersUseCase } from "../get-all-pizza-orders";

export function makeInMemoryGetAllPizzaOrderUseCase() {
  const inMemoryPizzaOrdersRepository = new InMemoryPizzaOrdersRepository()

  const useCase = new GetAllPizzaOrdersUseCase(
    inMemoryPizzaOrdersRepository,
  )

  return useCase
}