import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'
import initStoryshots from '@storybook/addon-storyshots'
import path from 'path'

// DEBT: currently the way to wait for component to render before taking screenshot. ref: https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer#specifying-options-to-jest-image-snapshots
const beforeScreenshot = () => new Promise<void>((resolve) => setTimeout(resolve, 600))

// DEBT: causing `Error: connect ECONNREFUSED ::1:80`. unabled to find the cause
initStoryshots({
  configPath: path.resolve(__dirname, '.storybook'),
  test: imageSnapshot({
    storybookUrl: process.env.STORYBOOK_BASEURL ?? 'http://localhost:6006',
    beforeScreenshot,
  }),
})
