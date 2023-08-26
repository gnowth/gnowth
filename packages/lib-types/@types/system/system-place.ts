export interface SystemBottom {
  bottom?: string
}

export interface SystemLeft {
  left?: string
}

export interface SystemPosition {
  position?: string
}

export interface SystemRight {
  right?: string
}

export interface SystemTop {
  top?: string
}

export interface SystemZIndex {
  zIndex?: number | string
}

export interface SystemPlace
  extends SystemBottom,
    SystemLeft,
    SystemPosition,
    SystemRight,
    SystemTop,
    SystemZIndex {}
