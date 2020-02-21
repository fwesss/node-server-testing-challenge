import db from '../../../db/config'
import { findAll, findById, insert, update, remove } from '../employees.model'

describe('employees model', () => {
  describe('findAll', () => {
    it('should return all employees in the database', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      expect(await findAll()).toEqual([
        { id: 1, name: 'Tuna', department: 'Treats', tenure: 3 },
        { id: 2, name: 'Scout', department: 'Bones', tenure: 2 },
      ])
    })
  })

  describe('findById', () => {
    it('should return the employee with matching Id', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      expect(await findById(1)).toEqual({
        id: 1,
        name: 'Tuna',
        department: 'Treats',
        tenure: 3,
      })
    })
  })

  describe('insert', () => {
    it('should insert the provided employees in the database', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      expect(await findAll()).toHaveLength(2)
    })

    it('should return the inserted employee', async () => {
      expect(
        await insert({
          name: 'Tuna',
          department: 'Treats',
          tenure: 3,
        })
      ).toEqual({
        id: 1,
        name: 'Tuna',
        department: 'Treats',
        tenure: 3,
      })
    })
  })

  describe('update', () => {
    it('should update the provided employee in the database', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      await update(1, { name: 'Tuna', department: 'Treats', tenure: 6 })

      expect(
        await db('employees')
          .where({ id: 1 })
          .first()
      ).toEqual({
        id: 1,
        name: 'Tuna',
        department: 'Treats',
        tenure: 6,
      })
    })
  })

  describe('remove', () => {
    it('should remove an employee from the database', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      await remove(1)

      expect(await findAll()).toHaveLength(1)
    })

    it('should return the id of the removed employee', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      expect(await remove(1)).toEqual(1)
    })
  })
})

beforeEach(async () => db('employees').truncate())
