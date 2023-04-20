import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreateOrgService } from '@/services/orgs/create-org-service'
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'

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
    const repository = new PrismaOrgRepository()
    const createOrgService = new CreateOrgService(repository)
    await createOrgService.execute({
      name,
      email,
      password,
      phone,
      cep,
      address,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    return reply.status(500).send()
  }

  return reply.status(201).send()
}
