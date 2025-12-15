import { InMemorySizesRepository } from "@/repositories/in-memory/in-memory-sizes-repository";
import { GetSizesUseCase } from "../get-sizes";

export function makeInMemoryGetSizesUseCase() {
  const inMemorySizesRepository = new InMemorySizesRepository()
  const useCase = new GetSizesUseCase(inMemorySizesRepository)

  return useCase
}