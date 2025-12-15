import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPizzaOrdersRepository } from '@/repositories/in-memory/in-memory-pizza-orders-repository'
import { FindPizzaOrderByIdUseCase } from './find-pizza-order-by-id'
import { NotFoundError } from './errors/not-found-error'

let repository: InMemoryPizzaOrdersRepository
let sut: FindPizzaOrderByIdUseCase

describe('Find Pizza Order by ID Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryPizzaOrdersRepository()
    sut = new FindPizzaOrderByIdUseCase(repository)
  })

  it('should be able to find pizza orders by id', async () => {
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

    const pizzaOrder = await sut.execute(createdPizzaOrder.id)

    expect(pizzaOrder).toEqual(createdPizzaOrder)
  })

  it('should not be able to find pizza orders with inexistent id', async () => {

    await expect(
      sut.execute('1')
    ).rejects.toBeInstanceOf(NotFoundError)
    
  })
})