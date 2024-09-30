import { PlatformConstant, PlatformParameters } from '../core/platform'
import { QueryClientReactQueryV5 } from './queries.clients'
import { QueryController } from './queries.controllers'
import { QueryService } from './queries.services'

export class QueryModule {
  static async construct(parameters: PlatformParameters): Promise<QueryModule> {
    await parameters.platform.moduleMount({ name: PlatformConstant.errorModule, type: 'module' })
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        clients: {
          [PlatformConstant.queryClient]: {
            [PlatformConstant.queryClientVariant.queryClientV5]: QueryClientReactQueryV5,
          },
        },
        controllers: { [PlatformConstant.queryController]: QueryController },
        providers: { [PlatformConstant.queryService]: QueryService },
      },
    })
    return new this()
  }
}
