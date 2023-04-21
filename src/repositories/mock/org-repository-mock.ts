import { Prisma } from '@prisma/client'

export class OrgRepositoryMock {
  public orgs: any[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = await this.orgs.push(data)

    return org
  }
}
