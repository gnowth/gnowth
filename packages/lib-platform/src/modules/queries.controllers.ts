import { PlatformConstant, PlatformParameters } from '../core/platform'
import { ErrorStream } from './errors.streams'
import { QueryInterfaceClientV1 } from './queries.types'

export class QueryController {
  static async construct(parameters: PlatformParameters): Promise<QueryController> {
    const errorStream = await parameters.platform.providerGet<ErrorStream>({
      name: PlatformConstant.errorStream,
      type: 'provider',
    })
    const queryClient = await parameters.platform.clientGet<QueryInterfaceClientV1>({
      name: PlatformConstant.queryClient,
      type: 'client',
      variant: PlatformConstant.queryClientVariant.queryClientV5,
    })

    queryClient.errorOut$.subscribe(errorStream.errorIn$)

    return new this()
  }

  // DEBT(investigation): react to create/get client instance from here?
}
