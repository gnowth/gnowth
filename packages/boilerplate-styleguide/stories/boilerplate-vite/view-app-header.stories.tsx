import { ViewAppHeader } from '@gnowth/vite-boilerplate'
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { Provider } from '../../src/components/provider'

const meta: Meta<typeof ViewAppHeader> = {
  component: ViewAppHeader,
  parameters: { libReact: { Provider } },
  title: 'BoilerplateVite/ViewAppHeader',
}

type Story = StoryObj<typeof ViewAppHeader>

export const Desktop: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const titleText = await canvas.findByText('Header')
    expect(titleText).toBeInTheDocument()
  },
}

export default meta
