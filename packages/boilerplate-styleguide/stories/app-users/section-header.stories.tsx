import { ApplicationUsersProvider, SectionHeader } from '@gnowth/app-users'
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

type Story = StoryObj<typeof SectionHeader>
const meta: Meta<typeof SectionHeader> = {
  component: SectionHeader,
  parameters: { libReact: { Provider: ApplicationUsersProvider } },
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
