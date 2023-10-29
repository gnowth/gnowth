import { guardNullish } from '@gnowth/lib-utils'
import { v4 as uuid } from 'uuid'

import type { ErrorType } from './errors'
import type { ServiceEvent } from './events'
import type { Group, GroupData } from './groups'
import { errorMessagesValidation } from './errors.messages'
import { TokenErrorValidation } from './errors.tokens'

type Parameters = { serviceEvent?: ServiceEvent }

export class ModelGroup {
  fromData(group: GroupData, parameters?: Parameters): Group {
    parameters?.serviceEvent?.logIfError({
      code: TokenErrorValidation.VA0000,
      errors: this.#dataValidate(group),
      logLevel: 'bug',
      messages: errorMessagesValidation,
      method: 'fromData',
      payload: { group },
      source: 'ModelGroup',
      sourceNamespace: '@gnowth/logic-users',
    })

    return {
      avatar: group.avatar,
      id: group.id,
      key: group.id ?? uuid(),
      name: group.name ?? 'N/A',
    }
  }

  getId(group: Group): string | null {
    return group.id ?? null
  }

  toData(group: Group): GroupData {
    return group
  }

  #dataValidate(group: GroupData): ErrorType[] {
    return [this.#dataValidateId(group.id), this.#dataValidateName(group.name)].flat()
  }

  #dataValidateId(id?: string): ErrorType[] {
    return guardNullish(id)
      ? [{ code: TokenErrorValidation.VA0001, messages: errorMessagesValidation, values: { field: 'id' } }]
      : []
  }

  #dataValidateName(name?: string): ErrorType[] {
    return !name
      ? [{ code: TokenErrorValidation.VA0001, messages: errorMessagesValidation, values: { field: 'name' } }]
      : []
  }
}
