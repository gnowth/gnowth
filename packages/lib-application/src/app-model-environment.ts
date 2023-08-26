import _ from 'lodash'

import AppModelApplication from './app-model-application'

const defaultApplication = new AppModelApplication({})

class AppModelEnvironment {
  applications: Record<string, AppModelApplication | undefined>

  constructor() {
    this.applications = this.initializeApplications()
  }

  getApplication(application?: AppModelApplication | string): AppModelApplication {
    if (!_.isString(application)) return application || defaultApplication

    return this.applications[application] || defaultApplication
  }

  initializeApplications(): Record<string, AppModelApplication | undefined> {
    return {}
  }
}

export default AppModelEnvironment
