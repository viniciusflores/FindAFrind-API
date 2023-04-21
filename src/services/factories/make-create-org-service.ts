import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { CreateOrgService } from '../orgs/create-org-service'

export function makeCreateOrgService() {
  const orgRepository = new PrismaOrgRepository()
  const createOrgService = new CreateOrgService(orgRepository)
  return createOrgService
}
