import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { knex } from "../database";
import { checkSessionIdExists } from '../middlewares/check-session-id-exist';

export async function mealsRoutes (app: FastifyInstance) {
  // GET MEAL BY ID
  app.get('/:id', 
    {
      preHandler: [checkSessionIdExists]
    },
    async (request, reply) => {
    const searchMealsIdSchema = z.object({
      id: z.string(),
    })
    const { id } = searchMealsIdSchema.parse(request.params)
   
    const [meal] = await knex('meals')
      .select('name', 'description', 'created_at', 'user_id')
      .where({id})
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

  // DELETE A MEAL
  app.delete('/:id', 
    {
      preHandler: [checkSessionIdExists]
    },
    async (request, reply) => {
    const { sessionId } = request.cookies
    const deleteMealIdSchema = z.object({
      id: z.string(),
    })

    const { id } = deleteMealIdSchema.parse(request.params)

    const [user] = await knex('users')
      .where({ 'session_id': sessionId})
      
    const userId = user.id

    await knex('meals')
      .where({
        'id': id,
        'user_id': userId
      }).del()

    return reply.status(204).send({
      message: `${id} deleted`
    })
  })

  // UPDATE A MEAL
  app.put('/:id', 
    {
      preHandler: [checkSessionIdExists]
    },
    async (request, reply) => {
    const updateMealIdSchema = z.object({
      id: z.string(),
    })
    const updateMealBodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      is_ondiet: z.boolean().optional(),
    })

    const { id } = updateMealIdSchema.parse(request.params)
    const { name, description, is_ondiet } = updateMealBodySchema.parse(request.body)

    await knex('meals')
      .where('id', id)
      .update({
        'name': name,
        'description': description,
        'is_ondiet': is_ondiet
      })

    return reply.status(200).send({
      message: 'Updated'
    })
  })

  //SHOW ALL MEALS OF USER
  app.get('/all/:username', 
    {
      preHandler: [checkSessionIdExists]
    },
    async (request, reply) => {
    const getAllUserMealsSchema = z.object({
      username: z.string()
    })
    const { username } = getAllUserMealsSchema.parse(request.params)

    const [user] = await knex('users')
      .select('id')
      .where({'username': username})
  
    if(!user.id){
      return reply.status(404).send({
        message: 'user not found'
      })
    }
    const userId = user.id
    const meals = await knex('meals')
      .where({'user_id': userId})
      .select()

    //console.log('meals', meals)

    return reply.status(200).send({
      data: meals
    })
  })

  // GET ALL MEALS
  app.get('/', 
    {
      preHandler: [checkSessionIdExists]
    },
    async (request) => {
      const { sessionId } = request.cookies
   
      const [user] = await knex('users')
        .where('session_id', sessionId)

      const userId = user.id

      const meals = await knex('meals')
        .where({ 'user_id': userId })
      //console.log('users', users)

      return { meals }
  })

  //SUMARY 
  app.get('/summary', 
    {
      preHandler: [checkSessionIdExists]
    },
    async(request, reply) => {
      const { sessionId } = request.cookies
   
      const [user] = await knex('users')
      .where('session_id', sessionId)

      const userId = user.id

      const mealsTotal = await knex('meals')
        .where({ 'user_id': userId})
        .select('id')
    
      //console.log('mealsTotal', mealsTotal.length)
    
      const mealsOnDiet = await knex('meals')
        .where({ 
          'user_id': userId,
          'is_ondiet': true
        })
        .select('id')

      //console.log('mealsOnDiet', mealsOnDiet.length)

      const mealsOutDiet = await knex('meals')
        .where({ 
          'user_id': userId,
          'is_ondiet': false
        })
        .select('id')

      //console.log('mealsOutDiet', mealsOutDiet.length)

      return reply.status(200).send({
        summary: {
          total_meals:  mealsTotal.length,
          total_meals_on_diet:  mealsOnDiet.length,
          total_meals_not_on_diet: mealsOutDiet.length,
          longer_sequence_of_meals_in_diet: mealsOnDiet.length
        }
      })
  })

  // CREATE A MEAL
  app.post('/', async (request, reply) => {
    const id = randomUUID()
    const createMealsBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      is_ondiet: z.boolean(),
    })

    const { name, description, is_ondiet } = createMealsBodySchema.parse(request.body)
    //console.log(name, description, is_ondiet)

    let sessionId = request.cookies.sessionId

    const [user] = await knex('users')
    .where('session_id', sessionId)

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