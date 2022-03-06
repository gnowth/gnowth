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

class ModelAxios {
  static toData = <TypeSerialized>(response: AxiosResponse<{ data: TypeSerialized }>) => {
    return response.data.data
  }

  static toDataList = <TypeSerialized>(response: AxiosResponse<TypeSerialized>) => {
    return response.data
  }

  static listDeserializer = <TypeSerialized, Type>(deserializer: (type: TypeSerialized) => Type) => {
    return (data: List<TypeSerialized>) => {
      return {
        ...data,
        data: data.data.map(deserializer),
        ...(data.meta && { count: Number(data.meta.count), pages: Number(data.meta.pages) }),
      }
    }
  }
}

export default ModelAxios
