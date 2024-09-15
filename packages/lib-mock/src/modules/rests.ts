import { pluralize } from 'inflected'
import { Collection, Request, RestSerializer } from 'miragejs'

function paginate<Type>(data: Type[], request: Request) {
  const page = Number(request.queryParams?.page ?? '0')
  const pageSize = Number(request.queryParams?.pageSize ?? '0')

  if (!page || !pageSize) return { data }

  const minIndex = (page - 1) * pageSize
  const maxIndex = page * pageSize
  const totalRecords = data.length

  return {
    data: data.slice(minIndex, maxIndex),
    meta: {
      count: totalRecords,
      pages: Math.ceil(totalRecords / pageSize),
    },
  }
}

// DEBT(hack): dirty ts fix
interface Serializer {
  normalize(data: Record<string, string>): unknown
  serialize(collection: Collection<unknown>, request: Request): Record<string, unknown[]>
  type: string
}

// DEBT(hack): dirty ts fix
export const RestMockSerializer = RestSerializer.extend({
  normalize(data) {
    return (RestSerializer.prototype as Serializer).normalize.call(this, {
      [(this as Serializer).type]: data,
    })
  },
  serialize(collection: Collection<unknown>, request: Request) {
    const output = (RestSerializer.prototype as Serializer).serialize.call(this, collection, request)
    const isArray = Array.isArray(collection.models)
    const key = isArray ? pluralize(collection.modelName) : collection.modelName

    return isArray ? paginate(output[key], request) : { data: output[key] }
  },
})
