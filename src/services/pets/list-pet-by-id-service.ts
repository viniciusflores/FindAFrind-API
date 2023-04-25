import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pet-repository'
import { PetNotFoundError } from '../errors/pet-not-found-error'

interface IListPetByIdServiceRequest {
  id: string
}

interface IListPetByIdServiceReply {
  pet: Pet
}
export class ListPetByIdService {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    id,
  }: IListPetByIdServiceRequest): Promise<IListPetByIdServiceReply> {
    const pet = await this.petRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
