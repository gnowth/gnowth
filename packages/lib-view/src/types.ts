import { WithThemeVariant } from '@gnowth/lib-theme'

export type PropsBase<Props> = WithThemeVariant<
  {
    className?: string
    classNamespace?: string
    disabled?: boolean
    hidden?: boolean
    id?: string
    slot?: string
  } & Props
>
