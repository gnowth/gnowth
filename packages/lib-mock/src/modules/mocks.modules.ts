import type { PlatformParameters } from '@gnowth/lib-platform'

import { FakerClient } from './mocks.clients'
import { MockConstant } from './mocks.constants'
import { MockService } from './mocks.services'

export class MockModule {
  static construct(parameters: PlatformParameters): Promise<void> {
    return parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        clients: { [MockConstant.mockClient]: { [MockConstant.mockClientVariant.faker]: FakerClient } },
        providers: { [MockConstant.mockService]: MockService },
      },
    })
  }
}
