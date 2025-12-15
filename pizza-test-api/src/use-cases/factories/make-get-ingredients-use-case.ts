import { InMemoryIngredientsRepository } from "@/repositories/in-memory/in-memory-ingredients-repository";
import { GetIngredientsUseCase } from "../get-ingredients";

export function makeInMemoryGetIngredientsUseCase() {
  const inMemoryIngredientsRepository = new InMemoryIngredientsRepository()
  const useCase = new GetIngredientsUseCase(inMemoryIngredientsRepository)

  return useCase
}