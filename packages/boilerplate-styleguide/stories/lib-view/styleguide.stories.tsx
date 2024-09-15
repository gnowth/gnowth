import { Meta, StoryObj } from '@storybook/react'

import { Styleguide } from '../../src/components/styleguide'

const meta: Meta<typeof Styleguide> = {
  component: Styleguide,
  title: 'Styleguide/All',
}

type Story = StoryObj<typeof Styleguide>

export const Desktop: Story = {}

export default meta
