export class AuthenticationController {
  static async construct(): Promise<object> {
    // query is authenticated
    // publish to stream
    // build stream. and stream class should just provide data, or allow other people to subscribe
    return new this()
  }
}
