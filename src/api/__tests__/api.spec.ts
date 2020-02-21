import request from 'supertest'
import server from '../../server/server'

describe('server', () => {
  describe('index route', () => {
    it('should return an OK status code', async () => {
      const response = await request(server).get('/api')
      expect(response.status).toEqual(200)
    })

    it('should return a JSON with API status', async () => {
      const response = await request(server).get('/api')
      expect(response.body).toEqual({ apiStatus: 'Running' })
    })

    it('should return a JSON response type', async () => {
      const response = await request(server).get('/api')
      expect(response.type).toEqual('application/json')
    })
  })
})
