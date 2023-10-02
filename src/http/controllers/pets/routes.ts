import { FastifyInstance } from 'fastify'
import { createPet } from './create-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { listPetById } from './find-pet-by-id'
import { listPetByCity } from './find-pet-by-city'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet', { onRequest: [verifyJWT] }, createPet)

  app.get('/pet/:id', listPetById)
  app.get('/pet/city', listPetByCity)

  app.get('/', (req, reply) => {
    console.log('HEALTH CHECK')
    return reply.status(200).send({ message: 'hello world' })
  })
}
