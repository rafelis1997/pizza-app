import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPizzaOrdersRepository } from '@/repositories/in-memory/in-memory-pizza-orders-repository'
import { FindPizzaOrderByIdUseCase } from './find-pizza-order-by-id'
import { InMemoryIngredientsRepository } from '@/repositories/in-memory/in-memory-ingredients-repository'
import { InMemorySizesRepository } from '@/repositories/in-memory/in-memory-sizes-repository'
import { CreatePizzaOrderUseCase } from './create-pizza-order'

let pizzaOrdersRepository: InMemoryPizzaOrdersRepository
let sizesRepository: InMemorySizesRepository
let ingredientsRepository: InMemoryIngredientsRepository
let sut: CreatePizzaOrderUseCase

describe('Create Pizza Order Use Case', () => {
  beforeEach(() => {
    pizzaOrdersRepository = new InMemoryPizzaOrdersRepository()
    sizesRepository = new InMemorySizesRepository()
    ingredientsRepository = new InMemoryIngredientsRepository()
    sut = new CreatePizzaOrderUseCase(sizesRepository, ingredientsRepository, pizzaOrdersRepository)
  })

  it('should be able to create pizza order', async () => {
    const bodyPizzaOrder = {
      costumerName: "John Doe",
      ingredientIds: ['1'],
      sizeId: '1'
    }

    const result = await sut.execute(bodyPizzaOrder)

    const orders = pizzaOrdersRepository.items

    expect(orders).toEqual([expect.objectContaining(result)])
  })

  it('should not be able to create pizza order with empty costumerName', async () => {
    const bodyPizzaOrder = {
      ingredientIds: ['1'],
      sizeId: '5'
    }

    await expect(
      sut.execute(bodyPizzaOrder as any)
    ).rejects.toThrow("Invalid costumerName")
  })

  it('should not be able to create pizza order with invalid sizeId', async () => {
    const bodyPizzaOrder = {
      costumerName: "John Doe",
      ingredientIds: ['1'],
      sizeId: '5'
    }

    await expect(
      sut.execute(bodyPizzaOrder)
    ).rejects.toThrow("Invalid sizeId: 5")
  })

  it('should not be able to create pizza order with invalid sizeId', async () => {
    const bodyPizzaOrder = {
      costumerName: "John Doe",
      ingredientIds: ['7', '8'],
      sizeId: '1'
    }

    await expect(
      sut.execute(bodyPizzaOrder)
    ).rejects.toThrow("Invalid ingredientsIds: 7, 8")
  })
})