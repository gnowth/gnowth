import type { SystemBox } from './system-box'
import type { SystemImage } from './system-image'
import type { SystemLayout } from './system-layout'
import type { SystemColor } from './system-palette'
import type { SystemPointer } from './system-pointer'
import type { SystemPlace } from './system-place'
import type { SystemSpace } from './system-space'
import type { SystemTypography } from './system-typography'

export interface System
  extends SystemBox,
    SystemColor,
    SystemImage,
    SystemLayout,
    SystemPlace,
    SystemPointer,
    SystemSpace,
    SystemTypography {}
