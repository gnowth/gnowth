module.exports = {
  modulePathIgnorePatterns: ['/.cache/', 'build'],
  rootDir: process.cwd(),
  transform: { '^.+\\.(jsx?|tsx?)$': 'ts-jest' },
  transformIgnorePatterns: ['node_modules/(?!(@gnowth)/)'],
}
