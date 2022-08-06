import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { expect } from '@storybook/jest'
import { SectionHeader as Component } from '@boilerplate/nextjs'
import { within } from '@storybook/testing-library'

const meta: ComponentMeta<typeof Component> = {
  component: Component,
  title: 'NextJS/SectionHeader',
}

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />

// DEBT: it is not going to the members tabs
export const Desktop = Template.bind({})
Desktop.parameters = {
  nextRouter: {
    path: '/members',
    asPath: '/members',
  },
}
Desktop.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)

  const textDashboard = canvas.getByText('Dashboard')
  expect(textDashboard).toBeInTheDocument()

  const textTeams = canvas.getByText('Teams')
  expect(textTeams).toBeInTheDocument()
}

export default meta
