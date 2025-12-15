import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPizzaOrdersRepository } from '@/repositories/in-memory/in-memory-pizza-orders-repository'
import { GetAllPizzaOrdersUseCase } from './get-all-pizza-orders'

let repository: InMemoryPizzaOrdersRepository
let sut: GetAllPizzaOrdersUseCase

describe('Get All Pizza Orders Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPizzaOrdersRepository()
    sut = new GetAllPizzaOrdersUseCase(repository)
  })

  it('should be able to get pizza orders', async () => {
    const createdPizzaOrder = {
      costumerName: "John Doe",
      createdAt: new Date(),
      finalPrice: 10000,
      id: '1',
      ingredients: [
        {extraPrice: 1000, id: '1', name: 'tomatoe'}
      ],
      size: {
        id: '1',
        basePrice: 50000,
        name: 'md'
      }
    }
      
    repository.items.push(createdPizzaOrder)

    const pizzaOrder = await sut.execute()

    expect(pizzaOrder).toHaveLength(1)
    expect(pizzaOrder[0]).toEqual(createdPizzaOrder)
  })
})