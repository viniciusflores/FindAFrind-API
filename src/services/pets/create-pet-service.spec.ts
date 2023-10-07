import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { OrgRepositoryMock } from '@/repositories/mock/org-repository-mock'
import { PetRepositoryMock } from '@/repositories/mock/pet-repository-mock'
import { CreatePetService } from './create-pet-service'
import { InvalidOrgError } from '../errors/invalid-org-error'

let orgRepository: OrgRepositoryMock
let petRepository: PetRepositoryMock
let sut: CreatePetService

describe('Create Pet', () => {
  beforeEach(() => {
    orgRepository = new OrgRepositoryMock()
    petRepository = new PetRepositoryMock()
    sut = new CreatePetService(orgRepository, petRepository)
  })

  it('Should be able to create a Pet', async () => {
    const org = await orgRepository.create({
      name: 'My Org With Same Email',
      email: 'myorg@example.com',
      phone: '11999999999',
      password_hash: await hash('123456', 6),
      address: 'Av Presidente Vargas 1501',
      cep: '99999991',
      city: 'Sao Paulo',
      state: 'SP',
    })

    const { pet } = await sut.execute({
      org_id: org.id,
      name: 'Chico',
      about: 'Chubby bulldog',
      age: 'PUPPY',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'LOW',
      race: 'DOG',
      gender: 'MALE',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('Should not be able to crate a Pet without valid ORG', async () => {
    await expect(() =>
      sut.execute({
        org_id: 'WRONG ORG ID',
        name: 'Chico',
        about: 'Chubby bulldog',
        age: 'PUPPY',
        size: 'MEDIUM',
        energy: 'HIGH',
        independence: 'LOW',
        race: 'DOG',
        gender: 'MALE',
      }),
    ).rejects.toBeInstanceOf(InvalidOrgError)
  })
})
