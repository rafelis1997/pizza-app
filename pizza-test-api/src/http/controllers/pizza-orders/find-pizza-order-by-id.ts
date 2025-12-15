import { FastifyRequest, FastifyReply } from 'fastify'
import { pizzaOrdersRepository } from '@/lib/in-memory'
import { FindPizzaOrderByIdUseCase } from '@/use-cases/find-pizza-order-by-id'
import z from 'zod'
import { NotFoundError } from '@/use-cases/errors/not-found-error'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    id: z.uuid()
  })

  const { data, ...parsedObject } = schema.safeParse(request.params)
  
  if (!data) {
    return await reply.status(400).send("Missing id params")
  }

  if (parsedObject.error) {
    return await reply.status(400).send(parsedObject.error.message)
  }

  try {
    const findPizzaOrderByIdUseCase = new FindPizzaOrderByIdUseCase(pizzaOrdersRepository)

    const order = await findPizzaOrderByIdUseCase.execute(data.id)
    return reply.status(200).send(order)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return await reply.status(404).send("Order not found")
    }
    return await reply.status(500).send()
  }
}