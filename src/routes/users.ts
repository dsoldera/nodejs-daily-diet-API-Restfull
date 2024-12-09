import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { knex } from "../database";
import { checkSessionIdExists } from '../middlewares/check-session-id-exist';

export async function usersRoutes (app: FastifyInstance) {
  app.get('/:id', 
    {
      preHandler: [checkSessionIdExists]
    },
    async (request, reply) => {
    const getUserIdBodySchema = z.object({
      id: z.string(),
    })
    const { id } = getUserIdBodySchema.parse(request.params)
   
    const user = await knex('users')
      .select('name', 'username', 'created_at')
      .where('id', id )
    //console.log('user', user)

    return reply.status(200).send(user)
  })

  app.get('/', 
    {
      preHandler: [checkSessionIdExists]
    },
    async (request) => {
    const { sessionId } = request.cookies
    const users = await knex('users')
      .where({ 'session_id': sessionId})
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

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('users').insert({
      id,
      name,
      username,
      session_id: sessionId,
    })

    return reply.status(201).send({
      id, name, username, sessionId
    })
  })
}