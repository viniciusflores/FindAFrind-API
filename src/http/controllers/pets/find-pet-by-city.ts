import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
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
    state: z.enum([
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ]),
  })

  const { city, state } = getPetByIdParamsSchema.parse(request.query)

  const orgsRepository = new PrismaOrgRepository()
  const petsRepository = new PrismaPetRepository()
  const listPetByIdService = new ListPetByCityService(
    orgsRepository,
    petsRepository,
  )
  const { pets } = await listPetByIdService.execute({ city, state })

  return reply.status(200).send(pets)
}
