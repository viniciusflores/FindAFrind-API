import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetService } from '../pets/create-pet-service'

export function makeCreatePetService() {
  const orgRepository = new PrismaOrgRepository()
  const petRepository = new PrismaPetRepository()
  const createPetService = new CreatePetService(orgRepository, petRepository)
  return createPetService
}
