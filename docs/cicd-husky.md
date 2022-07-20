---
title: Husky
category: cicd
---

# Husky v7.0.0

## Setup in repo

1. Add husky to project:

```bash
  npm add husky --save-dev
```

2. Install husky

```bash
  npx husky install
```

3. To automatically install husky on every npm install, run the following:

```bash
  npm set-script prepare 'husky install'
```

## Hooks

- To create a hook:

```bash
  npx husky add .husky/pre-commit 'npm test'
```

## Issues

> .husky/pre-commit: line 4: npm: command not found

- Try restarting vscode. alternatively try [deleting .git/hooks and reinstall husky](https://github.com/typicode/husky/issues/854#issuecomment-776126582)

## Reference

- https://typicode.github.io/husky/#/?id=install
