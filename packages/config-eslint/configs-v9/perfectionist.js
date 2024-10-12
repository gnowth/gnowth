import perfectionist from 'eslint-plugin-perfectionist'

export const perfectionistConfigs = [
  perfectionist.configs['recommended-natural'],
  { settings: { perfectionist: { ignoreCase: false } } },
]
