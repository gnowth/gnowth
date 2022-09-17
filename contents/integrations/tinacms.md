# tinacms

|      |                                       |
| ---- | ------------------------------------- |
| docs | https://tina.io/docs/                 |
| npm  | https://www.npmjs.com/package/tinacms |

## v0.69.7

- created a `types.d.ts` to import generated types so that errors due to `__generated__` not available points to that file
- created a `client.ts` to import client so that errors due to `client` not available points to that file
- peer dependencies on `next` is optional since pages and component can be used without `next`
- `contents` is placed within the same package as `tinacms` since it does not support contents to be outside of the package
- `admin` page is set as `/admin` since the internal links is not configurable
- `public folder` can only be within the root of the package. it will need to be exported to
