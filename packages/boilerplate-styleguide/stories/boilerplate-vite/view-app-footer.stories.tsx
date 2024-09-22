import { ViewAppFooter } from '@gnowth/vite-boilerplate'
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { Provider } from '../../src/components/provider'

const meta: Meta<typeof ViewAppFooter> = {
  component: ViewAppFooter,
  parameters: { libReact: { Provider } },
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
