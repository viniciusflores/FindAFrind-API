import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePetService } from '@/services/factories/make-create-pet-service'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(['PUPPY', 'JUNIOR', 'ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    race: z.enum(['DOG', 'CAT', 'OTHER']),
    gender: z.enum(['MALE', 'FEMALE']),
  })

  const { name, about, age, size, energy, gender, independence, race } =
    createPetBodySchema.parse(request.body)

  const createPetService = makeCreatePetService()
  await createPetService.execute({
    org_id: request.user.sub,
    name,
    about,
    age,
    size,
    energy,
    gender,
    independence,
    race,
  })

  return reply.status(201).send()
}
