import { FastifyInstance } from "fastify";
import knex from "knex";
import { z } from "zod";

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
    })

    const { name } = createUserBodySchema.parse(request.body)

    let user = await knex('users')
    .where({
      name,
    })
    .first()

    reply.status(201).send({
      status: 'success',
      data: user,
    })
  })
}