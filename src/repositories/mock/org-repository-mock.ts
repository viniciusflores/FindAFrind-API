import { randomUUID } from 'node:crypto'
import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../org-repository'

export class OrgRepositoryMock implements OrgsRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
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

  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findByPhone(phone: string) {
    const org = this.orgs.find((org) => org.phone === phone)

    if (!org) {
      return null
    }

    return org
  }
}
