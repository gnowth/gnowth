export class AuthenticationObservable {
  static async construct(): Promise<AuthenticationObservable> {
    return new this()
  }
}
