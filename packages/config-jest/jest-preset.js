const path = require('path')

module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.join(
      __dirname,
      './mock/mock-file.js',
    ),
    '\\.(css|less)$': path.join(__dirname, './mock/mock-style.js'),
  },
  modulePathIgnorePatterns: ['/.cache/'],
  rootDir: process.cwd(),
  setupFilesAfterEnv: [`${__dirname}/jest-setup.js`],
  transform: { '.+\\.(t|j)s$': 'ts-jest' },
  transformIgnorePatterns: ['node_modules/(?!(@smart|@theme|@gnowth)/)'],
}
