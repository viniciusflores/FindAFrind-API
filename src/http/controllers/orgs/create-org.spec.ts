import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a Org', async () => {
    const response = await request(app.server).post('/org').send({
      name: 'Org Example',
      email: 'orgexample@email.com',
      password: '123456',
      phone: '1199999999',
      cep: '99999999',
      address: 'Av Presidente Vargas 1234',
    })

    expect(response.statusCode).toEqual(201)
  })
})
