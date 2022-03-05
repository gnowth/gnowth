# Lint Staged v11.0.0

## Setup in repo

1. Install

```bash
	npm add lint-staged --save-dev
```

2. Configure according to documentation from reference. Check examples below

3. Add to pre-commit hook (REQUIREMENT: husky - see husky.md)

```bash
	npx husky add .husky/pre-commit 'npm exec lint-staged'
```

## Example

- package.json

```json
	"lint-staged": {
		"*.{json,css,scss,md}": "prettier --write",
		"*.{ts,js,tsx,jsx}": "eslint --fix"
	},
```

## Reference

- https://github.com/okonet/lint-staged
