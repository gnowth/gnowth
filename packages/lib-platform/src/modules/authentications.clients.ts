export class AuthenticationClient {
  static async construct(): Promise<AuthenticationClient> {
    return new this()
  }
}
