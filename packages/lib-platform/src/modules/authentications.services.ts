export class AuthenticationService {
  static async construct(): Promise<AuthenticationService> {
    return new this()
  }

  async login(): Promise<void> {
    return
  }

  async logout(): Promise<void> {
    return
  }

  async whoAmI(): Promise<void> {
    return
  }
}
