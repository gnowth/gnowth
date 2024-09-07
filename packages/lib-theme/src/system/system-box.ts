import { systemBuild, systemCompose } from './system'

export const systemBorder = systemBuild<{ border?: string }>({ key: 'border' })
export const systemBorderBottom = systemBuild<{ borderBottom?: string }>({ key: 'borderBottom' })
export const systemBorderColor = systemBuild<{ borderColor?: string }>({ key: 'borderColor' })
export const systemBorderLeft = systemBuild<{ borderLeft?: string }>({ key: 'borderLeft' })
export const systemBorderRadius = systemBuild<{ borderRadius?: string }>({ key: 'borderRadius' })
export const systemBorderRight = systemBuild<{ borderRight?: string }>({ key: 'borderRight' })
export const systemBorderTop = systemBuild<{ borderTop?: string }>({ key: 'borderTop' })
export const systemBoxShadow = systemBuild<{ boxShadow?: string }>({ key: 'boxShadow' })
export const systemOutline = systemBuild<{ outline?: string }>({ key: 'outline' })

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
