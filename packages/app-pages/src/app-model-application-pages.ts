import { AppModelApplication } from '@gnowth/lib-react'

export enum TokenPage {
  aboutUs = 'aboutUs',
  comingSoon = 'comingSoon',
  frequentlyAskedQuestion = 'frequentlyAskedQuestion',
  maintenance = 'maintenance',
  notAuthorised = 'notAuthorised',
  notFound = 'notFound',
  notPermitted = 'notPermitted',
  privacy = 'privacy',
  root = 'root',
  termsAndConditions = 'termsAndConditions',
}

class AppModelApplicationPages extends AppModelApplication {
  routes = {
    [TokenPage.aboutUs]: (): string => `${this.route}about-us/`,
    [TokenPage.comingSoon]: (): string => `${this.route}coming-soon/`,
    [TokenPage.frequentlyAskedQuestion]: (): string => `${this.route}faq/`,
    [TokenPage.maintenance]: (): string => `${this.route}maintenance/`,
    [TokenPage.notAuthorised]: (): string => `${this.route}not-authorised/`,
    [TokenPage.notFound]: (): string => `${this.route}not-found/`,
    [TokenPage.notPermitted]: (): string => `${this.route}not-permitted/`,
    [TokenPage.privacy]: (): string => `${this.route}privacy/`,
    [TokenPage.root]: (): string => this.route,
    [TokenPage.termsAndConditions]: (): string => `${this.route}terms-and-conditions/`,
  }
}

export default AppModelApplicationPages
