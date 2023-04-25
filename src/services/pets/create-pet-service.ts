import { Pet } from '@prisma/client'
import { OrgsRepository } from '@/repositories/org-repository'
import { PetsRepository } from '@/repositories/pet-repository'
import { InvalidOrgError } from '../errors/invalid-org-error'

interface ICreatePetServiceRequest {
  org_id: string
  name: string
  about: string
  age: 'PUPPY' | 'JUNIOR' | 'ADULT' | 'SENIOR'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy: 'LOW' | 'MEDIUM' | 'HIGH'
  independence: 'LOW' | 'MEDIUM' | 'HIGH'
  race: 'DOG' | 'CAT' | 'OTHER'
  gender: 'MALE' | 'FEMALE'
}

interface ICreatePetServiceReply {
  pet: Pet
}
export class CreatePetService {
  constructor(
    private orgRepository: OrgsRepository,
    private petRepository: PetsRepository,
  ) {}

  async execute({
    org_id,
    name,
    about,
    age,
    size,
    energy,
    independence,
    race,
    gender,
  }: ICreatePetServiceRequest): Promise<ICreatePetServiceReply> {
    const validOrg = await this.orgRepository.findById(org_id)

    if (!validOrg) {
      throw new InvalidOrgError()
    }

    const pet = await this.petRepository.create({
      org_id,
      name,
      about,
      age,
      size,
      energy,
      independence,
      race,
      gender,
    })

    return { pet }
  }
}
