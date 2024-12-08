// eslint-disable-next-line no-unused-vars
// import knex
declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      created_at: string
      session_id?: string
    }
    meals: {
      id: number
      name: string
      description: string
      created_at: string
      on_diet: boolean
      user_id: number
    }
  }
}