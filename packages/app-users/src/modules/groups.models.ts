import { ErrorData, ErrorModel, PlatformConstant, PlatformParameters } from '@gnowth/lib-react'
import { v4 as uuid } from 'uuid'

import { groupSchema, groupSchemaData } from './groups.schemas'
import { Group, GroupData } from './groups.types'

type Parameters = { errorModel: ErrorModel }
export class GroupModel {
  #errorModel: ErrorModel

  fromData = (groupData: GroupData): Group => {
    return groupSchema.parse({ ...groupData, key: groupData.id ?? uuid() })
  }

  toData = (group: Group): GroupData => {
    return groupSchemaData.parse(group)
  }

  constructor(parameters: Parameters) {
    this.#errorModel = parameters.errorModel
  }

  static async construct(parameters: PlatformParameters): Promise<GroupModel> {
    const errorModel = await parameters.platform.providerGet<ErrorModel>({
      name: PlatformConstant.errorModel,
      type: 'provider',
    })
    return new this({ errorModel })
  }

  getId(group: Group): string {
    return group.id
  }

  isValid(group: Group): boolean {
    return this.validate(group).length === 0
  }

  toString(group: Group): string {
    return group.name
  }

  validate(group: Group): ErrorData[] {
    const result = groupSchema.safeParse(group)
    return result.error ? this.#errorModel.fromErrorZod(result.error) : []
  }
}
