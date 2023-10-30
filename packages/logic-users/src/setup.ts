import { appSetupCompose } from '@gnowth/lib-application'

import { setupDependencies } from './setup.dependencies'

export const setup = appSetupCompose(setupDependencies)
