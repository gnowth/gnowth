module.exports = {
  modulePathIgnorePatterns: ['/.cache/'],
  rootDir: process.cwd(),
  transform: { '^.+\\.(jsx?|tsx?)$': 'ts-jest' },
  transformIgnorePatterns: ['node_modules/(?!(@smart|@theme|@gnowth|@boilerplate)/)'],
}
