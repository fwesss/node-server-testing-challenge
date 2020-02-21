import Knex, { QueryBuilder } from 'knex'

exports.seed = (knex: Knex): QueryBuilder =>
  knex('employees').insert([
    {
      name: 'Wes',
      department: 'Shoes',
      tenure: 7,
    },
    {
      name: 'Diz',
      department: 'Marketing',
      tenure: 7,
    },
    {
      name: 'Tuna',
      department: 'Treats',
      tenure: 7,
    },
    {
      name: 'Scout',
      department: 'Shoes',
      tenure: 7,
    },
    {
      name: 'Conrad',
      department: 'Beverages',
      tenure: 7,
    },
  ])
