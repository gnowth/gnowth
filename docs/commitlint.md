# Commitlint v12.1.4

## Setup

1. install

```
  npm install @commitlint/cli @commitlint/config-conventional --save-dev
```

2. configure

```
  echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

3. add locally in git hook (REQUIREMENT: husky - see husky.md)

```
  npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

## Reference

- https://commitlint.js.org/#/
