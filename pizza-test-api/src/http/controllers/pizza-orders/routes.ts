import { FastifyInstance } from "fastify";
import { create } from "./create-pizza-order";
import { getAll } from "./get-all-pizza-orders";
import { findById } from "./find-pizza-order-by-id";

export async function pizzaOrdersRoutes(app: FastifyInstance) {
  app.post('/pizza-orders/create', create)

  app.get('/pizza-orders', getAll)

  app.get('/pizza-orders/:id', findById)
}