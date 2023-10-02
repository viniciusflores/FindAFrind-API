import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { ListPetByCityService } from '@/services/pets/list-pet-by-city-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function listPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetByIdParamsSchema = z.object({
    city: z.string(),
  })

  const { city } = getPetByIdParamsSchema.parse(request.query)

  const petsRepository = new PrismaPetRepository()
  const listPetByIdService = new ListPetByCityService(petsRepository)
  const { pets } = await listPetByIdService.execute({ city })

  return reply.status(200).send(pets)
}
