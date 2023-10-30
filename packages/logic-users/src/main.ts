import { setup } from './setup'
import { configs } from './configs'

type WindowX = typeof window & { configurations: unknown }
;(window as WindowX).configurations = setup(configs)
