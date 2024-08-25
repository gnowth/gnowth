// TODO: add another service for route?
// TODO: add support for passwordless, multi-factor authentication, user emulation, single sign on, OAuth(google)
// TODO: allow multiple auth system
// https://auth0.com/blog/five-common-authentication-and-authorization-mistakes-to-avoid-in-your-saas-application/
export class AuthenticationClient {
  static async construct(): Promise<AuthenticationClient> {
    return new this()
  }

  changePassword() {
    return
  }

  getSession() {
    return
  }

  login() {
    return
  }

  logout() {
    return
  }

  // list, delete
  multiFactorAddAuthenticator() {
    return
  }

  multifactorVerifyWithOOB() {
    return
  }

  multifactorVerifyWithOTP() {
    return
  }

  multifactorVerifyWithRecoveryCode() {
    return
  }

  passwordlessRequest() {
    return
  }

  passwordlessVerify() {
    return
  }

  signup() {
    return
  }

  userInfo() {
    return
  }

  verifyEmail() {
    return
  }

  verifyPasswordStrength() {
    return
  }

  verifyToken() {
    return
  }
}
