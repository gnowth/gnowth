import { Model } from '@gnowth/lib-model'
import { ErrorData } from '@gnowth/lib-react'
import * as R from 'remeda'
import { v4 as uuid } from 'uuid'

import { EventService } from './events'
import { Group, GroupData } from './groups'

type Parameters = { eventService?: EventService }

export class GroupModel extends Model<Group> {
  #dataValidate(group: GroupData): ErrorData[] {
    return [this.#dataValidateId(group.id), this.#dataValidateName(group.name)].flat()
  }

  #dataValidateId(id?: string): ErrorData[] {
    return R.isNullish(id)
      ? [
          {
            code: 'logic-users--model-group--#dataValidateId--01',
            message: 'Field (id) data is required',
          },
        ]
      : []
  }

  #dataValidateName(name?: string): ErrorData[] {
    return !name
      ? [
          {
            code: 'logic-users--model-group--#dataValidateName--01',
            message: 'Field (name) data is required',
          },
        ]
      : []
  }

  fromData(group: GroupData, parameters?: Parameters): Group {
    parameters?.eventService?.logIfError({
      code: 'logic-users--model-group--from-data--01',
      errors: this.#dataValidate(group),
      logLevel: 'bug',
      message: 'Invalid group data received',
      method: 'fromData',
      payload: { group },
      source: 'GroupModel',
      sourceNamespace: '@gnowth/logic-users',
    })

    return {
      avatar: group.avatar,
      id: group.id,
      key: group.id ?? uuid(),
      name: group.name ?? 'N/A',
    }
  }

  getId(group: Group): null | string {
    return group.id ?? null
  }

  toData(group: Group): GroupData {
    return group
  }
}
