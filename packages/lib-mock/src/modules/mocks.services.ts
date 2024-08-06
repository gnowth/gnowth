import type { Server } from 'miragejs'

export class MockService {
  #server!: Server

  static async construct(): Promise<MockService> {
    return new this()
  }

  close() {
    return
  }

  listen() {
    return
  }

  resetHandlers() {
    return
  }

  restoreHandlers() {
    return
  }

  use() {
    return
  }
}
