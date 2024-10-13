import { describe, expect, it } from '@jest/globals'
import { Test } from '@nestjs/testing'

import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('appController', () => {
  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect.assertions(1)

      const app = await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService],
      }).compile()

      const appController = app.get(AppController)

      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
