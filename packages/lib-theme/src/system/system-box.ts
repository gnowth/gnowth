import { systemCompose, systemMake } from './system'

const systemBorder = systemMake<{ border: string }>({ key: 'border' })
const systemBorderBottom = systemMake<{ borderBottom: string }>({ key: 'borderBottom' })
const systemBorderColor = systemMake<{ borderColor: string }>({ key: 'borderColor' })
const systemBorderLeft = systemMake<{ borderLeft: string }>({ key: 'borderLeft' })
const systemBorderRadius = systemMake<{ borderRadius: string }>({ key: 'borderRadius' })
const systemBorderRight = systemMake<{ borderRight: string }>({ key: 'borderRight' })
const systemBorderTop = systemMake<{ borderTop: string }>({ key: 'borderTop' })
const systemBoxShadow = systemMake<{ boxShadow: string }>({ key: 'boxShadow' })
const systemOutline = systemMake<{ outline: string }>({ key: 'outline' })

export const systemBox = () =>
  systemCompose(
    systemBorder(),
    systemBorderBottom(),
    systemBorderColor(),
    systemBorderLeft(),
    systemBorderRadius(),
    systemBorderRight(),
    systemBorderTop(),
    systemBoxShadow(),
    systemOutline(),
  )
