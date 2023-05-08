import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeListPetByIdService } from '@/services/factories/make-list-pet-by-id-service'

export async function listPetById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetByIdParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetByIdParamsSchema.parse(request.params)

  const listPetByIdService = makeListPetByIdService()
  const { pet } = await listPetByIdService.execute({ id })

  return reply.status(200).send(pet)
}
