import type { PredicateIdentity, UtilOptional } from '@gnowth/lib-utils'
import {
  objectToKeys,
  operatorArrayFilterAnd,
  operatorSortMultiple,
  predicateSortFn,
} from '@gnowth/lib-utils'

import type { ErrorType } from '../errors'
import type { ServiceFaker } from '../fakers/fakers.services'
import type { FilterPredicate, SortDirection, SortKeyType, SortPredicate, SortType } from '../filters/filters'
import type { ServiceLogger } from '../loggers/loggers.services'
import type { ServiceFlag } from '../services'
import type { User, UserFilters } from './users.types'

const USER_STATUSES = ['ACTIVE'] as const
export type UserStatus = (typeof USER_STATUSES)[number]
export type UserSortKey = SortType<keyof InstanceType<typeof ModelUserFilters>['dictionarySort']>

interface Dependencies {
  serviceFaker?: ServiceFaker
  serviceFlag?: ServiceFlag
  serviceLogger?: ServiceLogger
}

interface OptionsModelUser {
  dependencies: Dependencies
}

export class ModelUser {
  private dependencies: Dependencies
  private options: OptionsModelUser

  constructor(options: OptionsModelUser) {
    this.dependencies = {
      ...options.dependencies,
      serviceLogger: options.dependencies.serviceLogger?.clone({ name: 'ModelUser' }),
    }
    this.options = options
  }

  generate(user: UtilOptional<User, 'status'>): User {
    const userGenerated = { ...user, status: user.status ?? 'ACTIVE' }
    const errors = this.validate(userGenerated)

    this.dependencies.serviceLogger?.bugIfErrors({
      errors,
      message: 'unable to create a valid User',
      method: 'generate',
      payload: userGenerated,
    })

    return userGenerated
  }

  generateFake(user?: Partial<User>): User {
    const id = this.dependencies.serviceFaker?.stringUuid({ value: user?.id }) ?? ''
    const nameFirst =
      this.dependencies.serviceFaker?.personFirstName({ seed: id, value: user?.nameFirst }) ?? ''
    const nameLast = this.dependencies.serviceFaker?.personLastName({ seed: id, value: user?.nameLast }) ?? ''

    return this.generate({
      ...user,
      email:
        this.dependencies.serviceFaker?.internetEmail({
          firstName: nameFirst,
          lastName: nameLast,
          seed: id,
          value: user?.email,
        }) ?? '',
      id,
      nameFirst,
      nameLast,
    })
  }

  isValid(user: User): boolean {
    return this.validate(user).length === 0
  }

  toString(user: User): string {
    return user.nameFirst
  }

  validate(user: User): ErrorType[] {
    return user ? [] : []
  }
}

export class ModelUserFilters {
  readonly dictionaryFilter = {
    nameFirst: this.filterByNameFirst,
    status: this.filterByStatus,
  }

  readonly dictionarySort = {
    nameFirst: this.sortByNameFirst,
    status: this.sortByStatus,
  }

  operatorArrayFilterAndSort(filters: UserFilters): PredicateIdentity<User[]> {
    type FilterKeys = keyof typeof this.dictionaryFilter

    const sortPredicates = filters.sortBy.map((key) => this.sortUsingKey(key))
    const filterPredicates = objectToKeys(filters)
      .filter((key) => filters[key] !== undefined)
      .filter((key): key is FilterKeys => key in this.dictionaryFilter)
      // TODO [tech-debt]: fix typescript
      .map((key) => this.filterUsingKey(key, filters[key] as string))

    return (users) =>
      users
        .filter(operatorArrayFilterAnd(...filterPredicates))
        .toSorted(operatorSortMultiple(...sortPredicates))
  }

  generate(filters: Partial<UserFilters>): UserFilters {
    return { ...filters, paramPage: filters.paramPage ?? 1, sortBy: filters.sortBy ?? [] }
  }

  private filterByNameFirst(nameFirst: string): FilterPredicate<User> {
    return (user) => user.nameFirst === nameFirst
  }

  private filterByStatus(status: UserStatus): FilterPredicate<User> {
    return (user) => user.status === status
  }

  private filterUsingKey<Key extends keyof typeof this.dictionaryFilter>(
    key: Key,
    value: Parameters<(typeof this.dictionaryFilter)[Key]>[0],
  ): FilterPredicate<User> {
    // TODO [tech-debt]: find better way to address typescript
    // might be of interest: https://imjacobclark.medium.com/generic-type-inference-through-function-argument-in-typescript-2edcf9e6b0bd
    const fn = this.dictionaryFilter[key] as (value: unknown) => FilterPredicate<User>
    return fn(value)
  }

  private sortByNameFirst(direction?: SortDirection): SortPredicate<User> {
    return predicateSortFn<User>({
      compare: (item1, item2) =>
        item1.nameFirst.toLocaleLowerCase().localeCompare(item2.nameFirst.toLocaleLowerCase()),
      direction,
      isNullish: (item) => !item.nameFirst,
    })
  }

  private sortByStatus(direction?: SortDirection): SortPredicate<User> {
    return predicateSortFn<User>({
      compare: (item1, item2) =>
        USER_STATUSES.findIndex((status) => item1.status === status) -
        USER_STATUSES.findIndex((status) => item2.status === status),
      direction,
      isNullish: (item) => !USER_STATUSES.includes(item.status),
    })
  }

  private sortUsingKey(key: UserSortKey): SortPredicate<User> {
    const descending = key.startsWith('-')
    const dictionaryKey = (descending ? key.slice(1) : key) as SortKeyType<UserSortKey>

    return this.dictionarySort[dictionaryKey](descending ? 'descending' : 'ascending')
  }
}
