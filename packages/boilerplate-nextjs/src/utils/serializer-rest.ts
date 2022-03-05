import type { Collection, Request } from 'miragejs'
import { pluralize } from 'inflected'
import { RestSerializer } from 'miragejs'

function paginate<Type>(data: Type[], request: Request) {
	const page = Number(request.queryParams.page ?? '0')
	const pageSize = Number(request.queryParams.pageSize ?? '0')

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

// DEBT: dirty ts fix
interface Serializer {
	serialize: (collection: Collection<unknown>, request: Request) => Record<string, unknown[]>
}

const SerializerRest = RestSerializer.extend({
	serialize(collection: Collection<unknown>, request: Request) {
		const output = (RestSerializer.prototype as Serializer).serialize.call(this, collection, request)
		const isArray = Array.isArray(collection.models)
		const key = isArray ? pluralize(collection.modelName) : collection.modelName

		return isArray ? paginate(output[key], request) : { data: output[key] }
	},
})

export default SerializerRest
