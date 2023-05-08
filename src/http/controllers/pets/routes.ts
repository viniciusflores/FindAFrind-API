import { FastifyInstance } from 'fastify'
import { createPet } from './create-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { listPetById } from './find-pet-by-id'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet', { onRequest: [verifyJWT] }, createPet)

  app.get('/pet/:id', listPetById)
}
