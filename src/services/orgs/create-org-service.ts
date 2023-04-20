import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface ICreateOrgService {
  name: String
  email: String
  password: String
  phone: String
  cep: String
  address: String
}

export async function createOrgService({
  name,
  email,
  password,
  phone,
  cep,
  address,
}: ICreateOrgService): Promise<void> {
  const password_hash = await hash(password, 6)

  const orgWithSameEmail = await prisma.org.findUnique({ where: { email } })
  const orgWithSamePhone = await prisma.org.findUnique({ where: { phone } })

  if (orgWithSameEmail || orgWithSamePhone) {
    throw new Error('E-mail or phone already exists.')
  }

  await prisma.org.create({
    data: {
      name,
      email,
      password_hash,
      phone,
      cep,
      address,
    },
  })
}
