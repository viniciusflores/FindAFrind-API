import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a Pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Chico',
        about: 'Chubby bulldog',
        age: 'PUPPY',
        size: 'MEDIUM',
        energy: 'HIGH',
        independence: 'LOW',
        race: 'DOG',
        gender: 'MALE',
      })

    expect(response.statusCode).toEqual(201)
  })
})
