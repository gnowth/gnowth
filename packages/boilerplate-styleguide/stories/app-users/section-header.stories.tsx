import type { Meta, StoryObj } from '@storybook/react'

import { SectionHeader } from '@gnowth/app-users'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'

type Story = StoryObj<typeof SectionHeader>
const meta: Meta<typeof SectionHeader> = {
  component: SectionHeader,
  title: 'AppUsers/SectionHeader',
}

export const Desktop: Story = {
  parameters: { nextRouter: { pathname: '/users' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const textDashboard = await canvas.findByText('Dashboard')
    expect(textDashboard).toBeInTheDocument()

    const textTeams = await canvas.findByText('Teams')
    expect(textTeams).toBeInTheDocument()
  },
}

export default meta
