import type { AsyncStatusPending, AsyncStatusRejected, AsyncStatusResolved } from './types'

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
