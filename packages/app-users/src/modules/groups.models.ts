import { ErrorData, ErrorModel, PlatformDependency, PlatformParameters } from '@gnowth/lib-react'
import { v4 as uuid } from 'uuid'

import { groupSchema, groupSchemaData } from './groups.schemas'
import { Group, GroupData } from './groups.types'

type Parameters = { errorModel: ErrorModel }
export class GroupModel {
  #errorModel: ErrorModel

  constructor(parameters: Parameters) {
    this.#errorModel = parameters.errorModel
  }

  static async construct(parameters: PlatformParameters): Promise<GroupModel> {
    const errorModel = await parameters.platform.providerGet<ErrorModel>({
      name: PlatformDependency.errorModel,
    })
    return new this({ errorModel })
  }

  fromData = (groupData: GroupData): Group => {
    return groupSchema.parse({ ...groupData, key: groupData.id ?? uuid() })
  }

  getId(group: Group): string {
    return group.id
  }

  isValid(group: Group): boolean {
    return this.validate(group).length === 0
  }

  toData = (group: Group): GroupData => {
    return groupSchemaData.parse(group)
  }

  toString(group: Group): string {
    return group.name
  }

  validate(group: Group): ErrorData[] {
    const result = groupSchema.safeParse(group)
    return result.error ? this.#errorModel.fromErrorZod(result.error) : []
  }
}
