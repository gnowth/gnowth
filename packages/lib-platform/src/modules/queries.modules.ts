import { PlatformDependency, PlatformParameters } from '../core/platform'
import { QueryClientReactQueryV5 } from './queries.clients'
import { QueryController } from './queries.controllers'
import { QueryService } from './queries.services'

export class QueryModule {
  static async construct(parameters: PlatformParameters): Promise<QueryModule> {
    await parameters.platform.moduleMount({ name: PlatformDependency.errorModule })
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        clients: {
          [PlatformDependency.queryClient]: {
            [PlatformDependency.queryClientVariant.queryClientV5]: QueryClientReactQueryV5,
          },
        },
        controllers: { [PlatformDependency.queryController]: QueryController },
        providers: { [PlatformDependency.queryService]: QueryService },
      },
    })
    return new this()
  }
}
