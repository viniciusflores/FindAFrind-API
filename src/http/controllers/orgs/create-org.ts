import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

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

  const password_hash = await hash(password, 6)

  const orgWithSameEmail = await prisma.org.findUnique({ where: { email } })
  const orgWithSamePhone = await prisma.org.findUnique({ where: { phone } })

  if (orgWithSameEmail || orgWithSamePhone) {
    return reply.status(409).send()
  }

  await prisma.org.create({
    data: {
      name,
      email,
      password_hash,
      phone,
      cep,
      address,
    },
  })

  return reply.status(201).send()
}
