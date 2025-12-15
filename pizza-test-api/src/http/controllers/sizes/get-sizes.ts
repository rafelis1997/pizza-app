import { FastifyRequest, FastifyReply } from 'fastify'
import { GetSizesUseCase } from '@/use-cases/get-sizes'
import { sizeRepository } from '@/lib/in-memory'

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllUseCase = new GetSizesUseCase(sizeRepository)

    const sizes = await getAllUseCase.execute()
    return reply.status(200).send(sizes)
  } catch (error) {
    return reply.status(500).send()
  }
}