import { QueryBuilder } from 'knex'

import { Id } from '../../utils/crud'
import db from '../../db/config'

export type Employee = {
  id: Id
  name: string
  department: string
  tenure: number
}

export const findAll = (): QueryBuilder<Employee[]> => db('employees')

export const findById = (id: Id): QueryBuilder<Employee> =>
  db('employees')
    .where({ id: Number(id) })
    .first()

export const insert = (employee: Omit<Employee, 'id'>): Promise<[Employee]> =>
  db('employees')
    .insert(employee)
    .then(([id]) => findById(id))

export const update = (
  id: Id,
  employee: Omit<Employee, 'id'>
): Promise<Employee> =>
  db('employees')
    .where({ id: Number(id) })
    .update(employee)
    .then(count => count > 0 && findById(id))

export const remove = (id: Id): QueryBuilder<number> =>
  db('employees')
    .where('id', Number(id))
    .del()

export default { findAll, findById, insert, update, remove }
