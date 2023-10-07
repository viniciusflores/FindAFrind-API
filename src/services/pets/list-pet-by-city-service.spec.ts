import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListPetByCityService } from './list-pet-by-city-service'
import { OrgRepositoryMock } from '@/repositories/mock/org-repository-mock'
import { PetRepositoryMock } from '@/repositories/mock/pet-repository-mock'

let orgRepository: OrgRepositoryMock
let petRepository: PetRepositoryMock
let sut: ListPetByCityService

describe('Find a Pet by City', () => {
  beforeEach(() => {
    orgRepository = new OrgRepositoryMock()
    petRepository = new PetRepositoryMock()
    sut = new ListPetByCityService(orgRepository, petRepository)
  })

  it('Should be possible to find a pet by city', async () => {
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

    await petRepository.create({
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

    const { pets } = await sut.execute({ city: 'SAO PAULO', state: 'SP' })
    expect(pets).toEqual(expect.any(Array))
    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        org_id: org.id,
        name: 'Chico',
        about: 'Chubby bulldog',
        age: 'PUPPY',
        size: 'MEDIUM',
        energy: 'HIGH',
        independence: 'LOW',
        race: 'DOG',
        gender: 'MALE',
      }),
    )
  })
})
