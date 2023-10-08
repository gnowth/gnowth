import type { Interpolate, System } from '../types'
import { systemCompose, systemInterpolate } from './system'

type SystemBackground = { background?: Interpolate<string> }
type SystemBackgroundColor = { backgroundColor?: Interpolate<string> }
type SystemBackgroundImage = { backgroundImage?: Interpolate<string> }
type SystemBackgroundPosition = { backgroundPosition?: Interpolate<string> }
type SystemBackgroundRepeat = { backgroundRepeat?: Interpolate<string> }
type SystemBackgroundSize = { backgroundSize?: Interpolate<string> }

export const systemBackground: () => System<SystemBackground> = () => (props, theme) =>
  systemInterpolate({ key: 'background', theme, value: props.background })

export const systemBackgroundColor: () => System<SystemBackgroundColor> = () => (props, theme) =>
  systemInterpolate({ key: 'backgroundColor', theme, value: props.backgroundColor })

export const systemBackgroundImage: () => System<SystemBackgroundImage> = () => (props, theme) =>
  systemInterpolate({ key: 'backgroundImage', theme, value: props.backgroundImage })

export const systemBackgroundPosition: () => System<SystemBackgroundPosition> = () => (props, theme) =>
  systemInterpolate({ key: 'backgroundPosition', theme, value: props.backgroundPosition })

export const systemBackgroundRepeat: () => System<SystemBackgroundRepeat> = () => (props, theme) =>
  systemInterpolate({ key: 'backgroundRepeat', theme, value: props.backgroundRepeat })

export const systemBackgroundSize: () => System<SystemBackgroundSize> = () => (props, theme) =>
  systemInterpolate({ key: 'backgroundSize', theme, value: props.backgroundSize })

export const systemImage = () =>
  systemCompose(
    systemBackground(),
    systemBackgroundColor(),
    systemBackgroundImage(),
    systemBackgroundPosition(),
    systemBackgroundRepeat(),
    systemBackgroundSize(),
  )
