interface Meta {
  count: number
  next?: string
  previous?: string
}

export interface Response<Value> {
  data: Value
  meta?: Meta
}
