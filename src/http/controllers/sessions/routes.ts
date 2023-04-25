import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function sessionsRoutes(app: FastifyInstance) {

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}
