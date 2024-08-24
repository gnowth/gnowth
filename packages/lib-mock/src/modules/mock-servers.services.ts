import type { Server } from 'miragejs'

export class MockServerService {
  #server!: Server

  static async construct(): Promise<MockServerService> {
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
