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

type Deserializer<Type, TypeData> = (type: TypeData) => Type
type ListDeserializerReturn<Type, TypeData> = (data: List<TypeData>) => Type[]
type ListVerboseDeserializerReturn<Type, TypeData> = (data: List<TypeData>) => ListVerbose<Type>

export class ModelAxios {
  static toData = <Data>(response: AxiosResponse<Data>): Data => {
    return response.data
  }

  static detailDeserializer = <TypeData, Type>(deserializer: (type: TypeData) => Type) => {
    return (data: Detail<TypeData>) => {
      return deserializer(data.data ?? ({} as TypeData))
    }
  }

  static listDeserializer = <Type, TypeData>(
    deserializer: Deserializer<Type, TypeData>,
  ): ListDeserializerReturn<Type, TypeData> => {
    return (data) => {
      const list = Array.isArray(data.data) ? data.data : []

      return list.map(deserializer)
    }
  }

  static listVerboseDeserializer = <TypeData, Type>(
    deserializer: Deserializer<Type, TypeData>,
  ): ListVerboseDeserializerReturn<Type, TypeData> => {
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
