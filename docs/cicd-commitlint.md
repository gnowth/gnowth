# Commitlint v12.1.4

## Setup in repo

1. install

```bash
	npm install @commitlint/cli @commitlint/config-conventional --save-dev
```

2. configure

```bash
	echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

3. add locally in git hook (REQUIREMENT: husky - see husky.md)

```bash
	npx husky add .husky/commit-msg 'npm exec commitlint -- --edit'
```

## Reference

- https://commitlint.js.org/#/
