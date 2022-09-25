import type { AxiosResponse } from 'axios'

export interface Detail<Type> {
  data: Type
}

export interface List<Type> {
  data: Type[]
  meta?: {
    count: number
    pages: number
  }
}

export interface ListVerbose<Type> {
  data: Type[]
  meta: {
    count: number
    pages: number
  }
}

type Deserializer<Type, TypeSerialized> = (type: TypeSerialized) => Type
type ListDeserializerReturn<Type, TypeSerialized> = (data: List<TypeSerialized>) => Type[]
type ListVerboseDeserializerReturn<Type, TypeSerialized> = (data: List<TypeSerialized>) => ListVerbose<Type>

class ModelAxios {
  static toData = <Data>(response: AxiosResponse<Data>): Data => {
    return response.data
  }

  static detailDeserializer = <TypeSerialized, Type>(deserializer: (type: TypeSerialized) => Type) => {
    return (data: Detail<TypeSerialized>) => {
      return deserializer(data.data ?? ({} as TypeSerialized))
    }
  }

  static listDeserializer = <Type, TypeSerialized>(
    deserializer: Deserializer<Type, TypeSerialized>,
  ): ListDeserializerReturn<Type, TypeSerialized> => {
    return (data) => {
      const list = Array.isArray(data.data) ? data.data : []

      return list.map(deserializer)
    }
  }

  static listVerboseDeserializer = <TypeSerialized, Type>(
    deserializer: Deserializer<Type, TypeSerialized>,
  ): ListVerboseDeserializerReturn<Type, TypeSerialized> => {
    return (data) => {
      const list = Array.isArray(data.data) ? data.data : []

      return {
        ...data,
        data: list.map(deserializer),
        meta: {
          count: data.meta?.count ?? list.length,
          pages: data.meta?.pages ?? 1,
        },
      }
    }
  }
}

export default ModelAxios
