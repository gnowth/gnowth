import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { SectionHeader as Component } from '@gnowth/users-app'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'

const meta: ComponentMeta<typeof Component> = {
  component: Component,
  title: 'AppUsers/SectionHeader',
}

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />

export const Desktop = Template.bind({})
Desktop.parameters = { nextRouter: { pathname: '/users' } }
Desktop.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  const textDashboard = await canvas.findByText('Dashboard')
  expect(textDashboard).toBeInTheDocument()

  const textTeams = await canvas.findByText('Teams')
  expect(textTeams).toBeInTheDocument()
}

export default meta
