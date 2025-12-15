import { FastifyRequest, FastifyReply } from 'fastify'
import { GetIngredientsUseCase } from '@/use-cases/get-ingredients'
import { ingredientsRepository } from '@/lib/in-memory'

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllUseCase = new GetIngredientsUseCase(ingredientsRepository)

    const ingredients = await getAllUseCase.execute()
    return reply.status(200).send(ingredients)
  } catch (error) {
    return reply.status(500).send()
  }
}