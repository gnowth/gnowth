import type { Server } from 'miragejs'
import { Service } from '@gnowth/lib-repository'

export class MockService extends Service {
  #server!: Server

  async onInit(): Promise<void> {
    return
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
