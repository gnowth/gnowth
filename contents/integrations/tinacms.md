# tinacms

|      |                                       |
| ---- | ------------------------------------- |
| docs | https://tina.io/docs/                 |
| npm  | https://www.npmjs.com/package/tinacms |

## v1.5.13

- created a `client.ts`
  - to import client so that errors due to `client` not available points to that file
  - to import generated types so that errors due to `__generated__` not available points to that file
- peer dependencies on `next` is optional since pages and component can be used without `next`
- `contents` is placed within the same package as `tinacms` since it does not support contents to be outside of the package
