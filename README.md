# boilerplate

## Setup

- `npm run setup`

## Command

Scripts with prefixed:

- `ci`: aimed to be run in the ci environment
- `local`: are aimed to run locally
- `project`: when you need to run a command in the respective project
- `workspaces`: aimed at running commands in each workspaces in a sequence

Scripts of interest:

- cleaning temporary files

```bash
  npm run local:clean:temp
```

- refreshing package-lock.json. does a clean install and rebuilding the lock file

```bash
  npm run setup:refresh
```

Next:

- build internationalisation from different modules
- internationalisation
- form validation
- testing
- animation
- visualisation
- offline
- auth
- error management
- analytics
- accessibility
- async
- icons
- markdown
- performance
  - images
- data
  - date
  - math
  - number
- rendering
- routing

TODO:
- move away from commonjs module and use verbatimModuleSyntax for typescript
- use create react app for boilerplate-cra
