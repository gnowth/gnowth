import type { AsyncStatusPending, AsyncStatusRejected, AsyncStatusResolved } from '../types'

interface Status {
  pending: AsyncStatusPending
  rejected: AsyncStatusRejected
  resolved: AsyncStatusResolved
}

export class PromiseModel {
  static status: Status = {
    pending: 'pending',
    rejected: 'rejected',
    resolved: 'resolved',
  }
}
