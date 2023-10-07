import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { OrgRepositoryMock } from '@/repositories/mock/org-repository-mock'
import { AuthenticateOrgService } from './authenticate-org-service'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let orgRepository: OrgRepositoryMock
let sut: AuthenticateOrgService

describe('Authenticate Org', () => {
  beforeEach(() => {
    orgRepository = new OrgRepositoryMock()
    sut = new AuthenticateOrgService(orgRepository)
  })

  it('Should be able to authenticate ORG', async () => {
    await orgRepository.create({
      name: 'Org Example',
      email: 'myorg@example.com',
      phone: '11999999999',
      password_hash: await hash('123456', 6),
      address: 'Av Presidente Vargas 1501',
      cep: '99999999',
      city: 'Sao Paulo',
      state: 'SP',
    })

    const { org } = await sut.execute({
      email: 'myorg@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate a ORG with a wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'myorg@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate a ORG with a wrong password', async () => {
    await orgRepository.create({
      name: 'My Org With Same Email',
      email: 'myorg@example.com',
      phone: '11999999999',
      password_hash: await hash('123456', 6),
      address: 'Av Presidente Vargas 1501',
      cep: '99999991',
      city: 'Sao Paulo',
      state: 'SP',
    })

    await expect(() =>
      sut.execute({
        email: 'myorg@example.com',
        password: 'wrong-pass',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
