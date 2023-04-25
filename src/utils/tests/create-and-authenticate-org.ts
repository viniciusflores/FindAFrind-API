import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'Org Example',
      email: 'myorg@example.com',
      phone: '11999999999',
      password_hash: await hash('123456', 6),
      address: 'Av Presidente Vargas 1501',
      cep: '99999999',
    },
  })

  const response = await request(app.server).post('/sessions').send({
    email: 'myorg@example.com',
    password: '123456',
  })

  const { token } = response.body

  return { token }
}
