import type { MatchImageSnapshotOptions } from 'jest-image-snapshot'
import { puppeteerTest, defaultImageSnapshotConfig } from '@storybook/addon-storyshots-puppeteer'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import initStoryshots from '@storybook/addon-storyshots'
import path from 'path'

expect.extend({ toMatchImageSnapshot })

// DEBT: to use when `@storybook/addon-storyshots-puppeteer` uses version ^v5.0.0 of `jest-image-snapshot`. This will allow us to generate received screenshot
// const test = imageSnapshot({
//   // DEBT: currently the way to wait for component to render before taking screenshot. ref: https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer#specifying-options-to-jest-image-snapshots
//   beforeScreenshot: () => new Promise<void>((resolve) => setTimeout(resolve, 600)),
//   getMatchOptions: () =>
//     ({
//       customReceivedDir: path.resolve(__dirname, '__image_snapshots__/__diff_output__'),
//       storeReceivedOnFailure: true,
//     } as MatchImageSnapshotOptions),
//   storybookUrl: process.env.STORYBOOK_BASEURL ?? 'http://localhost:6006',
// })

const test = puppeteerTest({
  ...defaultImageSnapshotConfig,
  async testBody(page, options) {
    expect.hasAssertions()
    await new Promise<void>((resolve) => setTimeout(resolve, 600))
    const image = await page.screenshot(defaultImageSnapshotConfig.getScreenshotOptions(options))

    expect(image).toMatchImageSnapshot({
      customReceivedDir: path.resolve(__dirname, '__image_snapshots__/__diff_output__/__received_output__'),
      storeReceivedOnFailure: true,
    } as MatchImageSnapshotOptions)
  },
})

// DEBT: causing `Error: connect ECONNREFUSED ::1:80`. unabled to find the cause
initStoryshots({
  test,
  configPath: path.resolve(__dirname, '.storybook'),
})
