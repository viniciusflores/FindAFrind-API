export class InvalidOrgError extends Error {
  constructor() {
    super('Invalid org identifier.')
  }
}
