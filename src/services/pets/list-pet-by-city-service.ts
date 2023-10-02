import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pet-repository'
import { PetNotFoundError } from '../errors/pet-not-found-error'

interface IListPetByCityServiceRequest {
  city: string
}

interface IListPetByCityServiceReply {
  pets: Pet[]
}
export class ListPetByCityService {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    city,
  }: IListPetByCityServiceRequest): Promise<IListPetByCityServiceReply> {
    const pets = await this.petRepository.findByCity(city)

    if (!pets) {
      throw new PetNotFoundError()
    }

    return { pets }
  }
}
