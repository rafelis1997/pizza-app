import { FastifyInstance } from "fastify";
import { getAll } from "./get-ingredients";

export async function ingredientsRoutes(app: FastifyInstance) {
  app.get('/ingredients', getAll)
}