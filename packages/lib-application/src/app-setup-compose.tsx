import type { ObjectLiteral } from '@gnowth/lib-utils'
import { chain } from '@gnowth/lib-utils'

export type AppSetup<Configuration, Settings = ObjectLiteral> = (settings?: Settings) => Configuration

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
  Settings,
>(
  setup01: AppSetup<Configuration01, Settings>,
  setup02?: AppSetup<Configuration02, Settings>,
  setup03?: AppSetup<Configuration03, Settings>,
  setup04?: AppSetup<Configuration04, Settings>,
  setup05?: AppSetup<Configuration05, Settings>,
  setup06?: AppSetup<Configuration06, Settings>,
  setup07?: AppSetup<Configuration07, Settings>,
  setup08?: AppSetup<Configuration08, Settings>,
  setup09?: AppSetup<Configuration09, Settings>,
  setup10?: AppSetup<Configuration10, Settings>,
  setup11?: AppSetup<Configuration11, Settings>,
  setup12?: AppSetup<Configuration12, Settings>,
  setup13?: AppSetup<Configuration13, Settings>,
  setup14?: AppSetup<Configuration14, Settings>,
  setup15?: AppSetup<Configuration15, Settings>,
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
  Settings
>

export const appSetupCompose: AppSetupCompose = (...setups) =>
  chain(
    (settings) => setups.map((setup) => setup?.(settings)),
    (configurations) => Object.assign({}, ...configurations),
  )
