// eslint-disable-next-line import/no-unresolved
import perfectionist from 'eslint-plugin-perfectionist'

export const perfectionistConfigs = [
  {
    name: 'perfectionist',
    ...perfectionist.configs['recommended-natural'],
    settings: { perfectionist: { ignoreCase: false } },
  },
]
