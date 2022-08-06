const path = require('path')

// DEBT(workaround): unable to read mdx. hence mocking it. could not get it to work with jest 27. https://github.com/storybookjs/storybook/issues/7223
module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '\\.(gif|jpg|jpeg|png|svg|webp)$': path.join(__dirname, '../mock/mock-file.js'),
    '\\.(aac|oga|m4a|mp3|mp4|wav|webm)$': path.join(__dirname, '../mock/mock-file.js'),
    '\\.(eot|otf|ttf|woff|woff2)$': path.join(__dirname, '../mock/mock-file.js'),
    '\\.(css|less)$': path.join(__dirname, '../mock/mock-style.js'),
    '\\.(md|mdx)$': path.join(__dirname, '../mock/mock-md.js'),
  },
  modulePathIgnorePatterns: ['/.cache/'],
  rootDir: process.cwd(),
  setupFilesAfterEnv: [path.join(__dirname, '../jest-setup.js')],
  testEnvironment: 'jest-environment-jsdom',
  transform: { '^.+\\.(jsx?|tsx?)$': 'ts-jest' },
  transformIgnorePatterns: ['node_modules/(?!(@smart|@theme|@gnowth|@boilerplate)/)'],
}
