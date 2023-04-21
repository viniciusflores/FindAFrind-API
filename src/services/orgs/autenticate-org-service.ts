import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/org-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface IAuthOrgServiceRequest {
  email: string
  password: string
}

interface IAuthOrgServiceReply {
  org: Org
}
export class AuthenticateOrgService {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: IAuthOrgServiceRequest): Promise<IAuthOrgServiceReply> {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
