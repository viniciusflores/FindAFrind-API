export class OrgNotFoundInCityError extends Error {
  constructor() {
    super("Don't have org in this city")
  }
}
