import { systemBuild, systemCompose } from './system'

export const systemBackground = systemBuild<{ background?: string }>({ key: 'background' })
export const systemBackgroundColor = systemBuild<{ backgroundColor?: string }>({ key: 'backgroundColor' })
export const systemBackgroundImage = systemBuild<{ backgroundImage?: string }>({ key: 'backgroundImage' })
export const systemBackgroundPosition = systemBuild<{ backgroundPosition?: string }>({
  key: 'backgroundPosition',
})
export const systemBackgroundRepeat = systemBuild<{ backgroundRepeat?: string }>({ key: 'backgroundRepeat' })
export const systemBackgroundSize = systemBuild<{ backgroundSize?: string }>({ key: 'backgroundSize' })

export const systemImage = () =>
  systemCompose(
    systemBackground(),
    systemBackgroundColor(),
    systemBackgroundImage(),
    systemBackgroundPosition(),
    systemBackgroundRepeat(),
    systemBackgroundSize(),
  )
