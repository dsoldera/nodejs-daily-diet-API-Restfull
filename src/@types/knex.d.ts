// eslint-disable-next-line no-unused-vars
import 'knex'
import { Meal, User } from '.'

declare module 'knex/types/tables' {
  export interface Tables {
      users: User
      meals: Meal
  }
}