import { AppModelApplication } from '@gnowth/lib-react'

export enum PagesPageToken {
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

export class AppModelApplicationPages extends AppModelApplication {
  routes = {
    [PagesPageToken.aboutUs]: (): string => `${this.route}about-us/`,
    [PagesPageToken.comingSoon]: (): string => `${this.route}coming-soon/`,
    [PagesPageToken.frequentlyAskedQuestion]: (): string => `${this.route}faq/`,
    [PagesPageToken.maintenance]: (): string => `${this.route}maintenance/`,
    [PagesPageToken.notAuthorised]: (): string => `${this.route}not-authorised/`,
    [PagesPageToken.notFound]: (): string => `${this.route}not-found/`,
    [PagesPageToken.notPermitted]: (): string => `${this.route}not-permitted/`,
    [PagesPageToken.privacy]: (): string => `${this.route}privacy/`,
    [PagesPageToken.root]: (): string => this.route,
    [PagesPageToken.termsAndConditions]: (): string => `${this.route}terms-and-conditions/`,
  }
}
