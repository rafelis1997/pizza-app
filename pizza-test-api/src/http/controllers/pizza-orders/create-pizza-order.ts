import { FastifyRequest, FastifyReply } from 'fastify'
import { ingredientsRepository, pizzaOrdersRepository, sizeRepository } from '@/lib/in-memory'
import { CreatePizzaOrderUseCase } from '@/use-cases/create-pizza-order'
import z from 'zod'

export const pizzaOrderSchema = z.object({
  costumerName: z.string().min(4),
  sizeId: z.string().nonempty(),
  ingredientIds: z.array(z.string()).min(1)
})

export async function create(request: FastifyRequest, reply: FastifyReply) {

  const { data, ...parsedOrder } = pizzaOrderSchema.safeParse(request.body)
  
  if (parsedOrder.error) {
    return reply.status(400).send(parsedOrder.error.message)
  }

  if (!data) {
    return reply.status(400).send()
  }

  try {
    const createUseCase = new CreatePizzaOrderUseCase(sizeRepository, ingredientsRepository, pizzaOrdersRepository)

    const order = await createUseCase.execute(data)
    return reply.status(201).send(order)
  } catch (error) {
    return reply.status(500).send()
  }
}