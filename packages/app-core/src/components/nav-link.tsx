import type { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type Props = Parameters<typeof Link>[0] & { hrefActive?: string }

export const NavLink: FunctionComponent<Props> = ({ hrefActive, ...props }) => {
  const pathname = usePathname() ?? '/users' // DEBT(hack): temporary hack to get chromatic to pass. To remove when fixing storybook nextjs router
  const isActive = pathname === props.href || (hrefActive && pathname?.startsWith(hrefActive))

  return (
    <Link {...props} data-semantic="NavLink">
      <Box
        _hover={{ bg: 'teal.100' }}
        borderBottom="3px solid"
        borderColor={isActive ? 'teal.300' : 'transparent'}
        cursor="pointer"
        py="3"
        px="4"
      >
        {props.children}
      </Box>
    </Link>
  )
}
