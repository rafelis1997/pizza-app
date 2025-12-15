import { InMemorySizesRepository } from '@/repositories/in-memory/in-memory-sizes-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetSizesUseCase } from './get-sizes'


let repository: InMemorySizesRepository
let sut: GetSizesUseCase

describe('Get Sizes Use Case', () => {
  beforeEach(() => {
    repository = new InMemorySizesRepository()
    sut = new GetSizesUseCase(repository)
  })

  it('should be able to get sizes', async () => {
    const sizes = await sut.execute()

    expect(sizes).toHaveLength(4)
  })
})