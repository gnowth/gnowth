import { describe, expect, it } from '@jest/globals'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from './app'

describe('appController (e2e)', () => {
  it('/ (GET)', async () => {
    expect.assertions(2)

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    const app = moduleFixture.createNestApplication()
    await app.init()

    const response = await request(app.getHttpServer()).get('/')

    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello World!')
  })
})
