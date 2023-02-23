import supertest from 'supertest'
import app from '../app'

const req = supertest(app)

describe('Server Testing', () => {
    it('[GET] Server shoud be running: /', async () => {
        const result = await req.get('/')
        expect(result.status).toBe(200)
    })
})