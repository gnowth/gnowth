import { ObjectLiteral } from '@gnowth/lib-utils'
import * as R from 'remeda'

export type AppSetup<Configuration, Configs = ObjectLiteral> = (configs: Configs) => Configuration

type AppSetupCompose = <
  Configuration01,
  Configuration02,
  Configuration03,
  Configuration04,
  Configuration05,
  Configuration06,
  Configuration07,
  Configuration08,
  Configuration09,
  Configuration10,
  Configuration11,
  Configuration12,
  Configuration13,
  Configuration14,
  Configuration15,
  Configs,
>(
  setup01: AppSetup<Configuration01, Configs>,
  setup02?: AppSetup<Configuration02, Configs>,
  setup03?: AppSetup<Configuration03, Configs>,
  setup04?: AppSetup<Configuration04, Configs>,
  setup05?: AppSetup<Configuration05, Configs>,
  setup06?: AppSetup<Configuration06, Configs>,
  setup07?: AppSetup<Configuration07, Configs>,
  setup08?: AppSetup<Configuration08, Configs>,
  setup09?: AppSetup<Configuration09, Configs>,
  setup10?: AppSetup<Configuration10, Configs>,
  setup11?: AppSetup<Configuration11, Configs>,
  setup12?: AppSetup<Configuration12, Configs>,
  setup13?: AppSetup<Configuration13, Configs>,
  setup14?: AppSetup<Configuration14, Configs>,
  setup15?: AppSetup<Configuration15, Configs>,
) => AppSetup<
  Configuration01 &
    Configuration02 &
    Configuration03 &
    Configuration04 &
    Configuration05 &
    Configuration06 &
    Configuration07 &
    Configuration08 &
    Configuration09 &
    Configuration10 &
    Configuration11 &
    Configuration12 &
    Configuration13 &
    Configuration14 &
    Configuration15,
  Configs
>

export const appSetupCompose: AppSetupCompose =
  (...setups) =>
  (configs) =>
    R.pipe(
      configs,
      (configs) => setups.map((setup) => setup?.(configs)),
      (configurations) => Object.assign({}, ...configurations),
    )
