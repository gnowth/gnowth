import { Box, Button, Flex, Heading, HStack, Spacer } from '@chakra-ui/react'

import LayoutSection from '../components/layout-section'
import ModelApp from '../models/model-app'
import NavLink from '../components/nav-link'

function SectionHeader() {
  return (
    <header>
      <LayoutSection
        rootProps={{
          bg: 'teal.600',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
          paddingY: '3',
        }}
      >
        <Flex>
          <Heading color="white" size="md">
            Teams App
          </Heading>

          <Spacer />

          <HStack>
            <Button size="xs">Sign up</Button>

            <Button size="xs">Log in</Button>
          </HStack>
        </Flex>
      </LayoutSection>

      <LayoutSection
        rootProps={{
          bg: 'teal.50',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
        }}
        containerProps={{ px: '0' }}
      >
        <HStack>
          <Box>
            <NavLink href={ModelApp.routes.dashboard()}>Dashboard</NavLink>
          </Box>

          <Box>
            <NavLink href={ModelApp.routes.teams()}>Teams</NavLink>
          </Box>

          <Box>
            <NavLink href={ModelApp.routes.members()}>Members</NavLink>
          </Box>

          <Box>
            <NavLink href={ModelApp.routes.reports()}>Reports</NavLink>
          </Box>
        </HStack>
      </LayoutSection>
    </header>
  )
}

export default SectionHeader
