import * as R from 'remeda'

import { AppModelApplication } from './app-model-application'

const defaultApplication = new AppModelApplication({})

export class AppModelEnvironment {
  applications: Record<string, AppModelApplication | undefined>

  constructor() {
    this.applications = this.initializeApplications()
  }

  getApplication(application?: AppModelApplication | string): AppModelApplication {
    if (!R.isString(application)) return application || defaultApplication

    return this.applications[application] || defaultApplication
  }

  initializeApplications(): Record<string, AppModelApplication | undefined> {
    return {}
  }
}
