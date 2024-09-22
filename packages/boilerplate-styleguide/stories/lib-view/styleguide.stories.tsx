import { Meta, StoryObj } from '@storybook/react'

import { Provider } from '../../src/components/provider'
import { Styleguide } from '../../src/components/styleguide'

const meta: Meta<typeof Styleguide> = {
  component: Styleguide,
  parameters: { libReact: { Provider } },
  title: 'Styleguide/All',
}

type Story = StoryObj<typeof Styleguide>

export const Desktop: Story = {}

export default meta
