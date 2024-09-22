import { ApplicationUsersProvider, SectionFooter } from '@gnowth/app-users'
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

type Story = StoryObj<typeof SectionFooter>
const meta: Meta<typeof SectionFooter> = {
  component: SectionFooter,
  parameters: { libReact: { Provider: ApplicationUsersProvider } },
  title: 'AppUsers/SectionFooter',
}

export const Desktop: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textCurrentVersion = await canvas.findByText('Current version:', { exact: false })
    expect(textCurrentVersion).toBeInTheDocument()
  },
}

export default meta
