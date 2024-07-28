import { configs } from './configs'
import { setup } from './setup'

type WindowX = { configurations: unknown } & typeof window
;(window as WindowX).configurations = setup(configs)
