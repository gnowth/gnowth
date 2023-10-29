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
- find rename environment to application and application to context?
- have a single way to retrieve data from both application and context
- merge theme with application? at least from components perspective, so that components are retrieve from a single function
- theme => serializable
- context => none serializable stuff
- when using a boundary/suspense, it should always have a fallback unless we explicitly ask it not to
- also lint .storybook folder
