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

TODO: Add trace definition for classes and methods via decorator
TODO: Add support for imports module to use a local instance rather than global
TODO: add flag to preconstruct modules/providers/controllers/components

TODO: check on hooks for node

- www.youtube.com/watch?v=KJP1E-Y-xyo
- www.youtube.com/watch?v=nyFHR0dDZo0

# Definitions

- Client
  - client is an interface to different other client
- Controller
  - connect streams
  - connect sub system?
- Model
  - transform data
  - should model be synchronous rather than async like everything else?
- Module
  - load all sub system
  - load and mount dependencies
- Service
  - CRUD data using different clients
