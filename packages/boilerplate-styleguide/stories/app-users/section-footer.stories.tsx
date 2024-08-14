import type { Meta, StoryObj } from '@storybook/react'

import { SectionFooter } from '@gnowth/app-users'
import { expect, within } from '@storybook/test'

const meta: Meta<typeof SectionFooter> = {
  component: SectionFooter,
  title: 'AppUsers/SectionFooter',
}

type Story = StoryObj<typeof SectionFooter>

export const Desktop: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textCurrentVersion = await canvas.findByText('Current version:', { exact: false })
    expect(textCurrentVersion).toBeInTheDocument()
  },
}

export default meta
