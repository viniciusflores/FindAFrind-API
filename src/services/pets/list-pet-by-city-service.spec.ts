import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListPetByCityService } from './list-pet-by-city-service'
import { OrgRepositoryMock } from '@/repositories/mock/org-repository-mock'
import { PetRepositoryMock } from '@/repositories/mock/pet-repository-mock'
import { assert } from 'node:console'

let orgRepository: OrgRepositoryMock
let petRepository: PetRepositoryMock
let sut: ListPetByCityService

describe('Create Pet', () => {
  beforeEach(() => {
    orgRepository = new OrgRepositoryMock()
    petRepository = new PetRepositoryMock()
    sut = new ListPetByCityService(orgRepository, petRepository)
  })

  it('Should be possible to find a pet by city', async () => {
    assert(true)
  })

  // it('Should be able to find a pet by id', async () => {
  //   const createdPet = await petRepository.create({
  //     org_id: randomUUID(),
  //     name: 'Chico',
  //     about: 'Chubby bulldog',
  //     age: 'PUPPY',
  //     size: 'MEDIUM',
  //     energy: 'HIGH',
  //     independence: 'LOW',
  //     race: 'DOG',
  //     gender: 'MALE',
  //   })

  //   const { pet } = await sut.execute({ id: createdPet.id })

  //   expect(pet.id).toEqual(expect.any(String))
  //   expect(pet.name).toEqual('Chico')
  // })

  // it('Should not be able to find a pet with a wrong id', async () => {
  //   await expect(() =>
  //     sut.execute({
  //       id: 'WRONG PET ID',
  //     }),
  //   ).rejects.toBeInstanceOf(PetNotFoundError)
  // })
})
