import { FastifyRequest, FastifyReply } from 'fastify'
import { pizzaOrdersRepository, sizeRepository } from '@/lib/in-memory'
import { GetAllPizzaOrdersUseCase } from '@/use-cases/get-all-pizza-orders'

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllUseCase = new GetAllPizzaOrdersUseCase(pizzaOrdersRepository)

    const orders = await getAllUseCase.execute()
    return reply.status(200).send(orders)
  } catch (error) {
    return reply.status(500).send()
  }
}