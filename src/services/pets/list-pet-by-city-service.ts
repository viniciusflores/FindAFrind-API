import { BrazilState, Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pet-repository'
import { OrgsRepository } from '@/repositories/org-repository'
import { returnOnlyOrgIdsOfOrgArray } from '@/utils/returnOnlyOrgIdsOfOrgArray'

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

    const onlyOrgIds = await returnOnlyOrgIdsOfOrgArray(orgs)

    const pets = await this.petRepository.findByOrgs(onlyOrgIds)

    return { pets }
  }
}
