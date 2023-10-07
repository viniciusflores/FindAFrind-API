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

  async findByCity(city: string) {
    const pets = await prisma.pet.findMany({
      include: {
        org: true,
      },
      where: {
        org: {
          address: {
            contains: city,
          },
        },
      },
    })
    return pets
  }

  async findByOrgs(orgs: string[]): Promise<Pet[] | null> {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: { in: orgs },
      },
    })

    return pets
  }
}
