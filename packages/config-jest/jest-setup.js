require('@testing-library/jest-dom/jest-globals')

const { TextDecoder, TextEncoder } = require('util')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
