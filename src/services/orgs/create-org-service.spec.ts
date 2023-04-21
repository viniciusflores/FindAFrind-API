import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateOrgService } from './create-org-service'
import { OrgRepositoryMock } from '@/repositories/mock/org-repository-mock'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

let orgRepository: OrgRepositoryMock
let sut: CreateOrgService

describe('Create Org', () => {
  beforeEach(() => {
    orgRepository = new OrgRepositoryMock()
    sut = new CreateOrgService(orgRepository)
  })

  it('Should be able to create a ORG', async () => {
    const { org } = await sut.execute({
      name: 'My Org',
      email: 'myorg@example.com',
      phone: '11999999999',
      password: '123456',
      address: 'Av Presidente Vargas 1500',
      cep: '99999999',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Should not be able to crate a ORG with a same email', async () => {
    await orgRepository.create({
      name: 'My Org With Same Email',
      email: 'myorg@example.com',
      phone: '11999999999',
      password_hash: await hash('123456', 6),
      address: 'Av Presidente Vargas 1501',
      cep: '99999991',
    })

    await expect(() =>
      sut.execute({
        name: 'My Org With Same Email',
        email: 'myorg@example.com',
        phone: '11999999992',
        password: '123456',
        address: 'Av Presidente Vargas 1501',
        cep: '99999991',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('Should not be able to crate a ORG with a same phone', async () => {
    await orgRepository.create({
      name: 'My Org With Same Email',
      email: 'myorg@example.com',
      phone: '11999999999',
      password_hash: await hash('123456', 6),
      address: 'Av Presidente Vargas 1501',
      cep: '99999991',
    })

    await expect(() =>
      sut.execute({
        name: 'My Org With Same Email',
        email: 'myorg2@example.com',
        phone: '11999999999',
        password: '123456',
        address: 'Av Presidente Vargas 1501',
        cep: '99999991',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
