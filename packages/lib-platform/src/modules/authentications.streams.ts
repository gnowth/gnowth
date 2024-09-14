export class AuthenticationStream {
  static async construct(): Promise<AuthenticationStream> {
    return new this()
  }
}
