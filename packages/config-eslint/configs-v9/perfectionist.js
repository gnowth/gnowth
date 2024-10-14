import perfectionist from 'eslint-plugin-perfectionist'

export const perfectionistConfigs = [
  {
    name: 'perfectionist',
    ...perfectionist.configs['recommended-natural-legacy'],
    plugins: { perfectionist },
    settings: { perfectionist: { ignoreCase: false } },
  },
]
