import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/services/errors/org-already-exists-error'
import { makeCreateOrgService } from '@/services/factories/make-create-org-service'

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
    const createOrgService = makeCreateOrgService()
    await createOrgService.execute({
      name,
      email,
      password,
      phone,
      cep,
      address,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
