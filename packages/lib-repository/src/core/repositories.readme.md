# Repositories

create instance

```ts
const parameters = {
  modulePathBuilder: (module: string) => `http://domain.com/${module.name}/${module.version}/main.js`,
}
const repository = await Repository.construct(parameters)
```

```ts
const repository = await Repository.construct()
const module = await repository.moduleGet({
  name: 'name',
  module: Module,
  version: 'v1'
  url: 'http://domain.com/main.js'
})
```

lifecycle

- onMount
