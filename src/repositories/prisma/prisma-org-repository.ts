import { prisma } from '@/lib/prisma'
import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../org-repository'

export class PrismaOrgRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { email } })
    return org
  }

  async findByPhone(phone: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { phone } })
    return org
  }
}
