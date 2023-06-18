import * as R from 'ramda'

import type { Environment } from './types'

type CreateConfigs<Configs> = (env?: Environment) => Configs
type Configurations<Configs> = ((env: Environment) => Configs) | Configs

// DEBT: should default environment be backend or frontend focus? can it be both
// frontend: check url to get environment
// frontend: allow to run specific environment in preview
// both: allow to run other environment from command
function defaultGetEnvironment(environment?: Environment): Environment {
  return environment ?? (process.env.NODE_ENVIRONMENT as Environment) ?? 'local'
}

function isCreateConfig<Configs>(
  configuration: Configurations<Configs>,
): configuration is (env: Environment) => Configs {
  return typeof configuration === 'function'
}

// DEBT: to make configs in environment optional
function makeConfigs<Configs extends object>(
  _configsDefault: Configurations<Configs>,
  _configsEnvironment = {} as Record<Environment, Configurations<Configs>>,
  getEnvironment = defaultGetEnvironment,
): CreateConfigs<Configs> {
  return function createConfigs(_environment?: Environment) {
    const environment = getEnvironment(_environment)
    const configsDefault = isCreateConfig(_configsDefault) ? _configsDefault(environment) : _configsDefault
    const configurationEnvironment = _configsEnvironment[environment] ?? {}
    const configsEnvironment = isCreateConfig(configurationEnvironment)
      ? configurationEnvironment(environment)
      : configurationEnvironment

    return R.mergeDeepLeft(configsDefault, configsEnvironment) as unknown as Configs
  }
}

export default makeConfigs
