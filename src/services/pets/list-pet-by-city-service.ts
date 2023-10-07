import { BrazilState, Pet } from '@prisma/client'
import { PetNotFoundError } from '../errors/pet-not-found-error'
import { PetsRepository } from '@/repositories/pet-repository'
import { OrgsRepository } from '@/repositories/org-repository'
import { returnOnlyOrgIdsOfOrgArray } from '@/utils/returnOnlyOrgIdsOfOrgArray'
import { OrgNotFoundInCityError } from '../errors/org-not-found-in-city-error'

interface IListPetByCityServiceRequest {
  city: string
  state: BrazilState
}

interface IListPetByCityServiceReply {
  pets: Pet[]
}
export class ListPetByCityService {
  constructor(
    private orgRepository: OrgsRepository,
    private petRepository: PetsRepository,
  ) {}

  async execute({
    city,
    state,
  }: IListPetByCityServiceRequest): Promise<IListPetByCityServiceReply> {
    const orgs = await this.orgRepository.findByCity(city, state)

    if (!orgs) {
      throw new OrgNotFoundInCityError()
    }

    const onlyOrgIds = await returnOnlyOrgIdsOfOrgArray(orgs)

    console.log(onlyOrgIds)

    if (1 === 1) {
      throw new Error('CHEGOU AQUI RAPAZ')
    }

    const pets = await this.petRepository.findByOrgs(onlyOrgIds)

    if (!pets) {
      throw new PetNotFoundError()
    }

    return { pets }
  }
}
