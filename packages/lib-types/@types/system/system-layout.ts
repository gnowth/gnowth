export interface SystemDisplay {
  display?: string
}

export interface SystemHeight {
  height?: string
}

export interface SystemMaxHeight {
  maxHeight?: string
}

export interface SystemMaxSize {
  maxSize?: string
}

export interface SystemMaxWidth {
  maxWidth?: string
}

export interface SystemMinHeight {
  minHeight?: string
}

export interface SystemMinSize {
  minSize?: string
}

export interface SystemMinWidth {
  minWidth?: string
}

export interface SystemOverflow {
  overflow?: string
}

export interface SystemOverflowX {
  overflowX?: string
}

export interface SystemOverflowY {
  overflowY?: string
}

export interface SystemSize {
  size?: string | number
}

export interface SystemWidth {
  width?: string | number
}

export interface SystemLayout
  extends SystemDisplay,
    SystemHeight,
    SystemMaxHeight,
    SystemMaxSize,
    SystemMaxWidth,
    SystemMinHeight,
    SystemMinSize,
    SystemMinWidth,
    SystemOverflow,
    SystemOverflowX,
    SystemOverflowY,
    SystemSize,
    SystemWidth {}
