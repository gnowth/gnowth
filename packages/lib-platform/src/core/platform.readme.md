# Repositories

create instance

```ts
const parameters = {
  modulePathBuilder: (module: string) => `http://domain.com/${module.name}/${module.version}/main.js`,
}
const platform = await Platform.construct(parameters)
```

```ts
const platform = await Platform.construct()
const module = await platform.moduleGet({
  name: 'name',
  modules: { name: Module },
  version: 'v1'
  url: 'http://domain.com/main.js'
})
```

lifecycle

- onMount
