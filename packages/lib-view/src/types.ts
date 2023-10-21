import { WithThemeVariant } from '@gnowth/lib-theme'

export type PropsBase<Props> = WithThemeVariant<
  Props & {
    className?: string
    classNamespace?: string
    disabled?: boolean
    hidden?: boolean
    id?: string
    slot?: string
  }
>
