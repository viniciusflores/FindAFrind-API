import { Prisma, Org, BrazilState } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  findByPhone(phone: string): Promise<Org | null>
  findByCity(city: string, state: BrazilState): Promise<Org[] | null>
}
