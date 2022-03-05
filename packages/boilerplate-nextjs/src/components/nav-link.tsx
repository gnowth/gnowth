import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = Parameters<typeof Link>[0]

function NavLink(props: Props) {
	const router = useRouter()
	const isActive = router.pathname == props.href || router.pathname.startsWith(`${props.href.toString()}/`)

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
