type Meta = {
  count: number
  next?: string
  previous?: string
}

type Response<Value> = {
  data: Value
  meta?: Meta
}

export class QueryResource<Value = unknown> {
  error?: Error

  isPending = true

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  promise: Promise<Response<Value> | void>

  promiseUnhandled: Promise<Response<Value>>

  response?: Response<Value>

  constructor(promise: Promise<Response<Value>>) {
    this.promiseUnhandled = promise
    // eslint-disable-next-line sonarjs/no-async-constructor
    this.promise = promise.then(this.handleQueryResponse).catch(this.handleError)
  }

  handleError = (error: Error): void => {
    this.error = error
    this.isPending = false
  }

  handleQueryResponse = (response: Response<Value>): Response<Value> => {
    this.response = response
    this.isPending = false

    return response
  }

  read(): Value {
    const response = this.readResponse()

    return response.data
  }

  readAsync(): Promise<Value> {
    return this.promiseUnhandled.then((response) => response.data)
  }

  readAsyncResponse(): Promise<Response<Value>> {
    return this.promiseUnhandled
  }

  readResponse(): Response<Value> {
    if (this.isPending || !this.response) {
      throw this.promise
    }

    if (this.error) throw this.error

    return this.response
  }
}
