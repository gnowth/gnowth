import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { SectionFooter as Component } from '@gnowth/app-users'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'

const meta: ComponentMeta<typeof Component> = {
  component: Component,
  title: 'AppUsers/SectionFooter',
}

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />

export const Desktop = Template.bind({})
Desktop.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textCurrentVersion = await canvas.findByText('Current version:', { exact: false })
  expect(textCurrentVersion).toBeInTheDocument()
}

export default meta
