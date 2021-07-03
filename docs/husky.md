# Husky v7.0.0

## Setup

1. add husky to project:

```
  npm add husky --save-dev
```

2. install husky

```
  npx husky install
```

3. To automatically install husky on every npm install, run the following:

```
  npm set-script prepare "husky install"
```


## Hooks

- To create a hook:

```
  npx husky add .husky/pre-commit "npm test"
```

## Reference

- https://typicode.github.io/husky/#/?id=install
