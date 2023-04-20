import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { createOrgService } from '@/services/orgs/create-org-service'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const createOrgSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    cep: z.string(),
    address: z.string(),
  })

  const { name, email, password, phone, cep, address } = createOrgSchema.parse(
    request.body,
  )

  try {
    await createOrgService({ name, email, password, phone, cep, address })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
