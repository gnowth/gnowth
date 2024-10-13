import perfectionist from 'eslint-plugin-perfectionist'

export const perfectionistConfigs = [
  perfectionist.configs['recommended-natural-legacy'],
  { settings: { perfectionist: { ignoreCase: false } } },
]
