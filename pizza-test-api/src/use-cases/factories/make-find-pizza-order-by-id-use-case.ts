import { InMemoryPizzaOrdersRepository } from "@/repositories/in-memory/in-memory-pizza-orders-repository";
import { FindPizzaOrderByIdUseCase } from "../find-pizza-order-by-id";

export function makeInMemoryFindPizzaOrderByIdUseCase() {
  const inMemoryPizzaOrdersRepository = new InMemoryPizzaOrdersRepository()

  const useCase = new FindPizzaOrderByIdUseCase(
    inMemoryPizzaOrdersRepository,
  )

  return useCase
}