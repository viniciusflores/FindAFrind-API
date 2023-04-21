import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/org-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface ICreateOrgService {
  name: string
  email: string
  password: string
  phone: string
  cep: string
  address: string
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
  }: ICreateOrgService) {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)
    const orgWithSamePhone = await this.orgRepository.findByPhone(phone)

    if (orgWithSameEmail || orgWithSamePhone) {
      throw new UserAlreadyExistsError()
    }

    await this.orgRepository.create({
      name,
      email,
      password_hash,
      phone,
      cep,
      address,
    })
  }
}
