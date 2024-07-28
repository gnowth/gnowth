import type { Server } from 'miragejs'
import { RepositoryService } from '@gnowth/lib-repository'

export class MockService extends RepositoryService {
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
