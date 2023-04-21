import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/org-repository'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

interface ICreateOrgServiceRequest {
  name: string
  email: string
  password: string
  phone: string
  cep: string
  address: string
}

interface ICreateOrgServiceReply {
  org: Org
}
export class CreateOrgService {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    cep,
    address,
  }: ICreateOrgServiceRequest): Promise<ICreateOrgServiceReply> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)
    const orgWithSamePhone = await this.orgRepository.findByPhone(phone)

    if (orgWithSameEmail || orgWithSamePhone) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      name,
      email,
      password_hash,
      phone,
      cep,
      address,
    })

    return { org }
  }
}
