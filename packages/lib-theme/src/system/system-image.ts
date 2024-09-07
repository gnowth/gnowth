import { systemCompose, systemMake } from './system'

const systemBackground = systemMake<{ background: string }>({ key: 'background' })
const systemBackgroundColor = systemMake<{ backgroundColor: string }>({ key: 'backgroundColor' })
const systemBackgroundImage = systemMake<{ backgroundImage: string }>({ key: 'backgroundImage' })
const systemBackgroundPosition = systemMake<{ backgroundPosition: string }>({ key: 'backgroundPosition' })
const systemBackgroundRepeat = systemMake<{ backgroundRepeat: string }>({ key: 'backgroundRepeat' })
const systemBackgroundSize = systemMake<{ backgroundSize: string }>({ key: 'backgroundSize' })

export const systemImage = () =>
  systemCompose(
    systemBackground(),
    systemBackgroundColor(),
    systemBackgroundImage(),
    systemBackgroundPosition(),
    systemBackgroundRepeat(),
    systemBackgroundSize(),
  )
