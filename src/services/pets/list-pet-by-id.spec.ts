import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { PetRepositoryMock } from '@/repositories/mock/pet-repository-mock'
import { ListPetByIdService } from './list-pet-by-id-service'
import { PetNotFoundError } from '../errors/pet-not-found-error'

let petRepository: PetRepositoryMock
let sut: ListPetByIdService

describe('Create Pet', () => {
  beforeEach(() => {
    petRepository = new PetRepositoryMock()
    sut = new ListPetByIdService(petRepository)
  })

  it('Should be able to find a pet by id', async () => {
    const createdPet = await petRepository.create({
      org_id: randomUUID(),
      name: 'Chico',
      about: 'Chubby bulldog',
      age: 'PUPPY',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'LOW',
      race: 'DOG',
      gender: 'MALE',
    })

    const { pet } = await sut.execute({ id: createdPet.id })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Chico')
  })

  it('Should not be able to find a pet with a wrong id', async () => {
    await expect(() =>
      sut.execute({
        id: 'WRONG PET ID',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
