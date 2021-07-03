# Renovate

## Setup

1. follow the link to install the app in your repo

   - github: `https://docs.renovatebot.com/install-github-app/`

2. Add configuration in either `package.json` or check reference for other ways to configure

```json
  "renovate": {
    "extends": [
      "config:base"
    ]
  },
```

3. Once that commits is in the main branch, renovate will create PR to update dependencies

## Reference

- https://docs.renovatebot.com/install-github-app/
- https://docs.renovatebot.com/configuration-options/
