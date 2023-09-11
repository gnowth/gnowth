import type { AsyncStatusPending, AsyncStatusRejected, AsyncStatusResolved } from '@gnowth/lib-types'

interface Status {
  pending: AsyncStatusPending
  rejected: AsyncStatusRejected
  resolved: AsyncStatusResolved
}

export class ModelPromise {
  static status: Status = {
    pending: 'pending',
    rejected: 'rejected',
    resolved: 'resolved',
  }
}
