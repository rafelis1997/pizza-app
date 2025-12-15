import { FastifyInstance } from "fastify";
import { getAll } from "./get-sizes";

export async function sizesRoutes(app: FastifyInstance) {
  app.get('/sizes', getAll)
}