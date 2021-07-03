# Conventional Commits v1.0.0

## Types

The following types are allowed:

- build:
- chore:
- ci:
- docs:
- feat:
- fix:
- perf:
- refactor:
- style:
- test:

**NOTE**: use **chore** when there is no production code change only

## Scopes

To be determined

## Specifications

- fix: this correlates with PATCH in Semantic Versioning
- feat: this correlates with MINOR in Semantic Versioning
- BREAKING CHANGE[appends a `!` after the type/scope]: correlating with MAJOR in Semantic Versioning
- example: `refactor(dependencies)!: drop support for Node 6`

## Reference

- https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines
- https://www.conventionalcommits.org/en/v1.0.0/
