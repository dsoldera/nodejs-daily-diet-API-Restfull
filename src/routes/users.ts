import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { knex } from "../database";

export async function usersRoutes (app: FastifyInstance) {
  app.get('/:id', async (request, reply) => {
    const createUserIdBodySchema = z.object({
      id: z.string(),
    })
    const { id } = createUserIdBodySchema.parse(request.params)
   
    const user = await knex('users')
      .select('name', 'username', 'created_at')
      .where('id', id )
    //console.log('user', user)

    return reply.status(200).send(user)
  })

  app.get('/', async (request) => {
   
    const users = await knex('users')
    //console.log('users', users)

    return { users }
  })

  app.post('/', async (request, reply) => {
    const id = randomUUID()
    const createUsersBodySchema = z.object({
      name: z.string(),
      username: z.string(),
    })

    const { name, username } = createUsersBodySchema.parse(request.body)

    await knex('users').insert({
      id,
      name,
      username,
      session_id: randomUUID(),
    })

    return reply.status(201).send({
      id, name, username
    })
  })
}