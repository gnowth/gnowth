import type { Server } from 'miragejs'

import { RepositoryService } from '@gnowth/lib-repository'

export class MockService extends RepositoryService {
  #server!: Server

  close() {
    return
  }

  listen() {
    return
  }

  async onInit(): Promise<void> {
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
