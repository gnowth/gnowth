import { ViewAppFooter } from '@gnowth/vite-boilerplate'
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof ViewAppFooter> = {
  component: ViewAppFooter,
  title: 'BoilerplateVite/ViewAppFooter',
}

type Story = StoryObj<typeof ViewAppFooter>

export const Desktop: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const copyrightText = await canvas.findByText('© Copyright GNOWTH 2021')
    expect(copyrightText).toBeInTheDocument()
  },
}

export default meta
