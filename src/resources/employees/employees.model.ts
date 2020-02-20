import { QueryBuilder } from 'knex'

import db from '../../db/config'

export type Employee = {
  id: number
  name: string
  department: string
  tenure: number
}

export const find = (): QueryBuilder => db('employees').select('*')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findBy = (filter: { [key: string]: any }): QueryBuilder =>
  db('employees')
    .select('*')
    .where(filter)

const insert = (user: Omit<Employee, 'id'>): Promise<Employee> =>
  db('employees')
    .insert(user)
    .then(ids => findBy({ id: ids[0] }).first())

export default { find, findBy, insert }
