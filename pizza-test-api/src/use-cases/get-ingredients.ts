import { IngredientsRepository } from "@/repositories/ingredients-repository";

export class GetIngredientsUseCase {
  constructor(private repository: IngredientsRepository) { }
  
  async execute() {
    return this.repository.getAll()
  }
}