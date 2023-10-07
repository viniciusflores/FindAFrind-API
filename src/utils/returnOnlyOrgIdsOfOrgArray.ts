import { Org } from '@prisma/client'

export async function returnOnlyOrgIdsOfOrgArray(
  orgs: Org[],
): Promise<string[]> {
  const onlyOrgIds: string[] = []
  orgs.forEach((org) => {
    onlyOrgIds.push(org.id)
  })
  return onlyOrgIds
}
