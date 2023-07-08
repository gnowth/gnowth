import type { IdentityPredicate, Optional } from '@gnowth/lib-utils'
import {
  chain,
  filter,
  filterPredicateUsingAnd,
  keys,
  makeSortPredicate,
  sort,
  sortPredicateUsingSequence,
} from '@gnowth/lib-utils'

import type { ErrorType, ModelError } from '../errors/errors'
import type { ServiceFaker } from '../fakers/fakers.services'
import type { FilterPredicate, SortDirection, SortKeyType, SortPredicate, SortType } from '../filters/filters'
import type { ServiceLogger } from '../loggers/loggers.services'
import type { ServiceFlag } from '../services'
import type { User, UserFilters } from './users.types'

const USER_STATUSES = ['ACTIVE'] as const
export type UserStatus = (typeof USER_STATUSES)[number]
export type UserSortKey = SortType<keyof InstanceType<typeof ModelUserFilters>['dictionarySort']>

interface Dependencies {
  modelError: ModelError
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

  generate(user: Optional<User, 'status'>): User {
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

  // TODO: decorator to check for dependency
  // @dependencyCheck('serviceFaker', 'unable to create a valid User')
  // this.dependencies.serviceLogger?.bugIfErrors({
  //   errors: this.dependencies.serviceFaker
  //     ? []
  //     : [this.dependencies.modelError.generateForInternal({ message: 'serviceFaker is not available' })],
  //   method: 'generateFake',
  //   message: 'unable to create a valid User',
  // })
  generateFake(user?: Partial<User>): User {
    const id = this.dependencies.serviceFaker?.stringUuid({ value: user?.id }) ?? ''
    const nameFirst =
      this.dependencies.serviceFaker?.personFirstName({ seed: id, value: user?.nameFirst }) ?? ''
    const nameLast = this.dependencies.serviceFaker?.personLastName({ seed: id, value: user?.nameLast }) ?? ''

    return this.generate({
      ...user,
      id,
      nameFirst,
      nameLast,
      email:
        this.dependencies.serviceFaker?.internetEmail({
          firstName: nameFirst,
          lastName: nameLast,
          seed: id,
          value: user?.email,
        }) ?? '',
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

  filterPredicateUsingAndSort(filters: UserFilters): IdentityPredicate<User[]> {
    type FilterKeys = keyof typeof this.dictionaryFilter

    const sortPredicates = filters.sortBy.map((key) => this.sortUsingKey(key))
    const filterPredicates = keys()(filters)
      .filter((key) => filters[key] !== undefined)
      .filter((key): key is FilterKeys => key in this.dictionaryFilter)
      // TODO [tech-debt]: fix typescript
      .map((key) => this.filterUsingKey(key, filters[key] as string))

    return chain(
      filter(filterPredicateUsingAnd(...filterPredicates)),
      sort(sortPredicateUsingSequence(...sortPredicates)),
    )
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
    const fn = this.dictionaryFilter[key] as (value: unknown) => FilterPredicate<User>
    return fn(value)
  }

  private sortByNameFirst(direction?: SortDirection): SortPredicate<User> {
    return makeSortPredicate<User>({
      direction,
      compare: (item1, item2) =>
        item1.nameFirst.toLocaleLowerCase().localeCompare(item2.nameFirst.toLocaleLowerCase()),
      isNullish: (item) => !item.nameFirst,
    })
  }

  private sortByStatus(direction?: SortDirection): SortPredicate<User> {
    return makeSortPredicate<User>({
      direction,
      compare: (item1, item2) =>
        USER_STATUSES.findIndex((status) => item1.status === status) -
        USER_STATUSES.findIndex((status) => item2.status === status),
      isNullish: (item) => !USER_STATUSES.includes(item.status),
    })
  }

  private sortUsingKey(key: UserSortKey): SortPredicate<User> {
    const descending = key.startsWith('-')
    const dictionaryKey = (descending ? key.slice(1) : key) as SortKeyType<UserSortKey>

    return this.dictionarySort[dictionaryKey](descending ? 'descending' : 'ascending')
  }
}
