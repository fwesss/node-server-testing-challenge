import Knex, { SchemaBuilder } from 'knex'

export const up = (knex: Knex): SchemaBuilder =>
  knex.schema.createTable('employees', table => {
    table.increments()
    table.string('name').notNullable()
    table.string('department').notNullable()
    table.integer('tenure').notNullable()
  })

export const down = (knex: Knex): SchemaBuilder =>
  knex.schema.dropTableIfExists('users')
