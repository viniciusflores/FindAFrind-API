import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pet-repository'

export class PetRepositoryMock implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      org_id: data.org_id,
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independence: data.independence,
      race: data.race,
      gender: data.gender,
      created_at: new Date(),
    }

    this.pets.push(pet)

    return pet
  }
}
