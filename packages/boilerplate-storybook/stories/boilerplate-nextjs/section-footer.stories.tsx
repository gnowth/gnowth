import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { expect } from '@storybook/jest'
import { SectionFooter as Component } from '@boilerplate/nextjs'
import { within } from '@storybook/testing-library'

const meta: ComponentMeta<typeof Component> = {
  component: Component,
  title: 'NextJS/SectionFooter',
}

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />

export const Desktop = Template.bind({})
Desktop.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textCurrentVersion = canvas.getByText('Current version:', { exact: false })
  expect(textCurrentVersion).toBeInTheDocument()
}

export default meta
