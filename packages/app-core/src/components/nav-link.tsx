import type { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = Parameters<typeof Link>[0] & { hrefActive?: string }

const NavLink: FunctionComponent<Props> = (props) => {
  const router = useRouter()
  const isActive =
    router.pathname == props.href || (props.hrefActive && router.pathname.startsWith(props.hrefActive))

  return (
    <Link {...props}>
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

export default NavLink
