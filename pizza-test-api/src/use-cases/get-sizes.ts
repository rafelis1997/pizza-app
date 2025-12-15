import { SizesRepository } from "@/repositories/size-repository";

export class GetSizesUseCase {
  constructor(private repository: SizesRepository) { }
  
  async execute() {
    return this.repository.getAll()
  }
}