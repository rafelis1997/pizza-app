import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryIngredientsRepository } from '@/repositories/in-memory/in-memory-ingredients-repository'
import { GetIngredientsUseCase } from './get-ingredients'

let repository: InMemoryIngredientsRepository
let sut: GetIngredientsUseCase

describe('Get Ingredients Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryIngredientsRepository()
    sut = new GetIngredientsUseCase(repository)
  })

  it('should be able to get ingredients', async () => {
    const ingredients = await sut.execute()

    expect(ingredients).toHaveLength(6)
  })
})