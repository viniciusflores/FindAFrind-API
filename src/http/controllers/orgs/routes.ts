import { FastifyInstance } from 'fastify'
import { createOrg } from './create-org'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/org', createOrg)
}
