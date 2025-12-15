import { InMemorySizesRepository } from "@/repositories/in-memory/in-memory-sizes-repository";
import { InMemoryIngredientsRepository } from "@/repositories/in-memory/in-memory-ingredients-repository";
import { InMemoryPizzaOrdersRepository } from "@/repositories/in-memory/in-memory-pizza-orders-repository";
import { CreatePizzaOrderUseCase } from "../create-pizza-order";

export function makeInMemoryCreatePizzaOrderUseCase() {
  const inMemorySizesRepository = new InMemorySizesRepository()
  const inMemoryIngredientsRepository = new InMemoryIngredientsRepository()
  const inMemoryPizzaOrdersRepository = new InMemoryPizzaOrdersRepository()

  const useCase = new CreatePizzaOrderUseCase(
    inMemorySizesRepository,
    inMemoryIngredientsRepository,
    inMemoryPizzaOrdersRepository,
  )

  return useCase
}