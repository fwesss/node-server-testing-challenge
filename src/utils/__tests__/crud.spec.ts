/* eslint-disable jest/expect-expect */
import request from 'supertest'
import server from '../../server/server'
import db from '../../db/config'
import { insert } from '../../resources/employees/employees.model'

describe('CRUD', () => {
  describe('getMany', () => {
    it('should respond with a 200 status', () => {
      return request(server)
        .get('/api/employees')
        .expect(200)
    })

    it('should respond with all employees', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      return request(server)
        .get('/api/employees')
        .expect([
          { id: 1, name: 'Tuna', department: 'Treats', tenure: 3 },
          { id: 2, name: 'Scout', department: 'Bones', tenure: 2 },
        ])
    })
  })

  describe('getOne', () => {
    it('should respond with a 200 status', () => {
      return request(server)
        .get('/api/employees/1')
        .expect(200)
    })

    it('should respond with one employee', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      return request(server)
        .get('/api/employees/1')
        .expect({
          id: 1,
          name: 'Tuna',
          department: 'Treats',
          tenure: 3,
        })
    })
  })

  describe('createOne', () => {
    it('should respond with a 201 status', () => {
      return request(server)
        .post('/api/employees')
        .send({ id: 1, name: 'Tuna', department: 'Treats', tenure: 3 })
        .expect(201)
    })

    it('should add an employee then respond with one employee', async () => {
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      return request(server)
        .post('/api/employees')
        .send({ name: 'Tuna', department: 'Treats', tenure: 3 })
        .expect({
          id: 2,
          name: 'Tuna',
          department: 'Treats',
          tenure: 3,
        })
    })
  })

  describe('updateOne', () => {
    it('should respond with a 200 status', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      return request(server)
        .put('/api/employees/1')
        .send({ id: 1, name: 'Tuna', department: 'Treats', tenure: 6 })
        .expect(200)
    })

    it('should respond with one updated employee', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      return request(server)
        .put('/api/employees/1')
        .send({ name: 'Tuna', department: 'Treats', tenure: 6 })
        .expect({
          id: 1,
          name: 'Tuna',
          department: 'Treats',
          tenure: 6,
        })
    })
  })

  describe('removeOne', () => {
    it('should respond with a 200 status', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      return request(server)
        .delete('/api/employees/1')
        .expect(200)
    })

    it('should respond with confirmation the employee was removed', async () => {
      await insert({ name: 'Tuna', department: 'Treats', tenure: 3 })
      await insert({ name: 'Scout', department: 'Bones', tenure: 2 })

      return request(server)
        .delete('/api/employees/1')
        .expect({ message: 'This item has been deleted' })
    })
  })
})

beforeEach(async () => db('employees').truncate())
