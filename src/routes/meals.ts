import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { knex } from "../database";

export async function mealsRoutes (app: FastifyInstance) {
  app.get('/:id', async (request, reply) => {
    const searchMealsIdBodySchema = z.object({
      id: z.string(),
    })
    const { id } = searchMealsIdBodySchema.parse(request.params)
   
    const [meal] = await knex('meals')
      .select('name', 'description', 'created_at', 'user_id')
      .where('id', id )
    //console.log('meal', meal)

    const [user] = await knex('users')
      .select('username')
      .where('id', meal.user_id)
    //console.log('username', user.username)

    return reply.status(200).send({
      data: [`Nome: ${meal.name}`, 
             `Descrição: ${meal.description}`, 
             `Usuario: ${user.username}`],
    })
  })

  app.get('/', async (request) => {
   
    const meals = await knex('meals')
    //console.log('users', users)

    return { meals }
  })

  app.post('/', async (request, reply) => {
    const id = randomUUID()
    const createMealsBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      is_ondiet: z.boolean(),
      username: z.string(),
    })

    const { name, description, is_ondiet, username } = createMealsBodySchema.parse(request.body)

    //console.log(name, description, is_ondiet, username)

    const [user] = await knex('users')
      .select('id')
      .where('username', username)

    const userId = user.id

    //console.log(user)
    if(userId){
      await knex('meals').insert({
        id,
        name,
        description,
        is_ondiet,
        user_id: userId,
      })
    }

    return reply.status(201).send({
      id, name,
    })
  })
}