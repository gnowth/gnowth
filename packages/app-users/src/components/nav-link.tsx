import type { FunctionComponent } from 'react'

import { UIButton, useAppTheme } from '@gnowth/lib-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = { children: string; hrefActive?: string } & Parameters<typeof Link>[0]

export const NavLink: FunctionComponent<Props> = ({ hrefActive, ...props }) => {
  const pathname = usePathname() ?? '/users/' // DEBT(hack): temporary hack to get chromatic to pass. To remove when fixing storybook nextjs router
  const isActive = pathname === props.href || (hrefActive && pathname?.startsWith(hrefActive))
  const theme = useAppTheme()
  return (
    <Link {...props} data-semantic="NavLink">
      <UIButton
        borderBottom={
          isActive ? { '&&': `2px solid ${theme.getPaletteColor({ palette: 'primary' })}` } : undefined
        }
        palette="textPrimary"
        textValue={props.children}
        variant="navigation"
      />
    </Link>
  )
}
