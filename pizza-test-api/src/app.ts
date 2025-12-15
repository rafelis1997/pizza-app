import fastify from 'fastify'
import { ZodError } from 'zod'
import cors from '@fastify/cors'

import { env } from './env'
import { sizesRoutes } from './http/controllers/sizes/routes'
import { ingredientsRoutes } from './http/controllers/ingredients/routes'
import { pizzaOrdersRoutes } from './http/controllers/pizza-orders/routes'


export const app = fastify()

app.register(cors, {
  origin: "*"
});

app.register(sizesRoutes)
app.register(ingredientsRoutes)
app.register(pizzaOrdersRoutes)
app.get('/health', (_, rep) => rep.status(200).send({status: "ok"}))

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})