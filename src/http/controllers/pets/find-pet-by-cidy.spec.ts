import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'

describe('Find Pet By City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find a Pet by City', async () => {
    const { org_id } = await createAndAuthenticateOrg(app)

    const pet = await prisma.pet.create({
      data: {
        org_id,
        name: 'Chico',
        about: 'Chubby bulldog',
        age: 'PUPPY',
        size: 'MEDIUM',
        energy: 'HIGH',
        independence: 'LOW',
        race: 'DOG',
        gender: 'MALE',
      },
    })

    const response = await request(app.server)
      .get(`/pet/city`)
      .query({
        city: 'Sao Paulo',
        state: 'SP',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body[0]).toEqual(expect.objectContaining(pet))
  })
})
