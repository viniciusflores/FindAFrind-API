import { prisma } from '@/lib/prisma'
import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pet-repository'

export class PrismaPetRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } })

    return pet
  }

  async findByOrgs(orgs: string[]): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: { in: orgs },
      },
    })

    return pets
  }
}
