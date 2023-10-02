import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/org').send({
      name: 'Org Example',
      email: 'myorg@example.com',
      phone: '11999999999',
      password: '123456',
      address: 'Av Presidente Vargas 1501',
      cep: '99999999',
      city: 'Sao Paulo',
      state: 'SP',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'myorg@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
