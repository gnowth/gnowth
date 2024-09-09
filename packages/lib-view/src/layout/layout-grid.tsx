import type { PropsLayout } from '@gnowth/lib-application'
import type { SystemType, ThemeVariants } from '@gnowth/lib-theme'
import type { ComponentType, FunctionComponent, ReactNode } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBox,
  systemCompose,
  systemGrid,
  systemLayout,
  systemSpace,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { createElement } from 'react'
import * as R from 'remeda'

interface ComponentProps {
  children?: ReactNode
  className?: string
  'data-testid'?: string
  id?: string
}
interface PropsLayoutGrid extends PropsLayout, SystemType<typeof layoutGrid> {
  as?: ComponentType<ComponentProps> | null | string
  children: ReactNode
  className?: string
  gridColumnCount?: number
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsLayoutGrid | string
  variantNamespace?: string
  variants?: ThemeVariants<PropsLayoutGrid>
}

const layoutGrid = systemCompose(systemBox(), systemGrid(), systemLayout(), systemSpace())
const makeStyles = themeMakeStyles({ layoutGrid })

const variants: ThemeVariants<PropsLayoutGrid> = {
  table: (props) => ({
    borderTop: {
      [`& > *:not(:nth-child(-n+${props.gridColumnCount}))`]: `1px solid ${props.theme.getPaletteColor({ palette: 'gray', paletteWeight: '300' })}`,
    },
    gridTemplateColumns: R.pipe(
      R.range(0, props.gridColumnCount ?? 0),
      R.map(() => 'auto'),
      R.join(' '),
    ),
    paddingBottom: { '& > *': 'xxs' },
    paddingLeft: { '& > *': 'xs' },
    paddingRight: { '& > *': 'xs' },
    paddingTop: { '& > *': 'xxs' },
  }),
}

const propsDefault: Partial<PropsLayoutGrid> = {
  display: 'grid',
  variant: 'table',
  variantNamespace: 'layoutGrid',
  variants,
}

export const LayoutGrid: FunctionComponent<PropsLayoutGrid> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return createElement(
    propsVariant.as || 'div',
    {
      className: cx(
        'layout-grid',
        R.isString(propsVariant.variant) && `layout-grid--${propsVariant.variant}`,
        propsVariant.className,
        styles.layoutGrid,
      ),
      'data-testid': 'view-layout-grid',
      id: propsVariant.id,
    },
    propsVariant.children,
  )
}
