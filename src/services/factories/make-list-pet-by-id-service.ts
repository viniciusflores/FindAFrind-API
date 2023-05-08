import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { ListPetByIdService } from '../pets/list-pet-by-id-service'

export function makeListPetByIdService() {
  const petRepository = new PrismaPetRepository()
  const listPetByIdService = new ListPetByIdService(petRepository)
  return listPetByIdService
}
