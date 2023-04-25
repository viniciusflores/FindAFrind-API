import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { AuthenticateOrgService } from '../orgs/authenticate-org-service'

export function makeAuthenticateOrgService() {
  const orgRepository = new PrismaOrgRepository()
  const authenticateOrgService = new AuthenticateOrgService(orgRepository)
  return authenticateOrgService
}
