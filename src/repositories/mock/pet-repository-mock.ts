import { randomUUID } from 'node:crypto'
import { Org, Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pet-repository'

export class PetRepositoryMock implements PetsRepository {
  public pets: Pet[] = []
  public orgs: Org[] = []

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

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByCity(city: string) {
    const orgsInCity = this.orgs.filter((org) => org.address === city)

    if (!orgsInCity) {
      return null
    }

    const petsOfCity: any[] = []

    orgsInCity.map((org) => {
      const pet = this.pets.filter((pet) => pet.org_id === org.id)
      if (pet) {
        petsOfCity.push(pet)
      }
      return null
    })

    console.log(petsOfCity)

    if (petsOfCity.length === 0) {
      return null
    }

    return petsOfCity
  }

  async createOrg(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      cep: data.cep,
      address: data.address,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }
}
