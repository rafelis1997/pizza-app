import { Size } from "./entities/size-entity"

export interface SizesRepository {
  getAll(): Promise<Size[]>
  findById(id: string): Promise<Size | undefined>
}