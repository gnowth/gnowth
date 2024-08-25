import type { PredicateArrayFilter, PredicateIdentity, PredicateSort } from '@gnowth/lib-utils'
import type { SortDirection, SortKeyType } from '@gnowth/logic-core'

import { Model } from '@gnowth/lib-model'
import { operatorArrayFilterAnd, operatorSortMultiple, predicateSortFn } from '@gnowth/lib-utils'
import { TokenQueryPageSize } from '@gnowth/logic-core'
import * as R from 'remeda'

import type {
  UserFilter,
  UserFilterData,
  UserFilterKey,
  UserFilterParams,
  UserSortKey,
} from './user-filters.types'
import type { User, UserStatus } from './users'

export class UserFilterModel extends Model<UserFilter> {
  #userStatuses: UserStatus[] = ['active', 'deactivated']

  #filterByEmail(email?: string): PredicateArrayFilter<User> {
    return !email ? this.#filterNone() : (user) => user.email === email
  }

  #filterByNameFirst(nameFirst?: string): PredicateArrayFilter<User> {
    return !nameFirst ? this.#filterNone() : (user) => user.nameFirst === nameFirst
  }

  #filterByNameLast(nameLast?: string): PredicateArrayFilter<User> {
    return !nameLast ? this.#filterNone() : (user) => user.nameLast === nameLast
  }

  #filterByStatus(status?: string): PredicateArrayFilter<User> {
    return !status ? this.#filterNone() : (user) => user.status === status
  }

  #filterNone(): PredicateArrayFilter<User> {
    return () => true
  }

  #sort(filter: UserFilter): PredicateSort<User> {
    const sorts: Record<UserSortKey, (direction?: SortDirection) => PredicateSort<User>> = {
      email: this.#sortByEmail,
      nameFirst: this.#sortByNameFirst,
      nameLast: this.#sortByNameLast,
      status: this.#sortByStatus,
    }

    const sortPredicates = filter.sortBy.map((key) => {
      const descending = key.startsWith('-')
      const dictionaryKey = (descending ? key.slice(1) : key) as SortKeyType<UserSortKey>

      return sorts[dictionaryKey](descending ? 'descending' : 'ascending')
    })

    return operatorSortMultiple(...sortPredicates)
  }

  #sortByEmail(direction?: SortDirection): PredicateSort<User> {
    return predicateSortFn<User>({
      compare: (item1, item2) =>
        item1.email.toLocaleLowerCase().localeCompare(item2.email.toLocaleLowerCase()),
      direction,
      isNullish: (item) => !item.email,
    })
  }

  #sortByNameFirst(direction?: SortDirection): PredicateSort<User> {
    return predicateSortFn<User>({
      compare: (item1, item2) =>
        item1.nameFirst.toLocaleLowerCase().localeCompare(item2.nameFirst.toLocaleLowerCase()),
      direction,
      isNullish: (item) => !item.nameFirst,
    })
  }

  #sortByNameLast(direction?: SortDirection): PredicateSort<User> {
    return predicateSortFn<User>({
      compare: (item1, item2) =>
        item1.nameLast.toLocaleLowerCase().localeCompare(item2.nameLast.toLocaleLowerCase()),
      direction,
      isNullish: (item) => !item.nameLast,
    })
  }

  #sortByStatus(direction?: SortDirection): PredicateSort<User> {
    return predicateSortFn<User>({
      compare: (item1, item2) =>
        this.#userStatuses.findIndex((status) => item1.status === status) -
        this.#userStatuses.findIndex((status) => item2.status === status),
      direction,
      isNullish: (item) => !this.#userStatuses.includes(item.status),
    })
  }

  filter(filter: UserFilter): PredicateArrayFilter<User> {
    const filters: Record<UserFilterKey, PredicateArrayFilter<User>> = {
      email: this.#filterByNameFirst(filter.email),
      nameFirst: this.#filterByNameFirst(filter.nameFirst),
      nameLast: this.#filterByNameFirst(filter.nameLast),
      status: this.#filterByStatus(filter.status),
    }

    // TODO: check when value is not undefined but also filter is not required
    const filterPredicates = R.keys(filters)
      .filter((key) => filter[key] !== undefined)
      .map((key) => filters[key])

    return operatorArrayFilterAnd(...filterPredicates)
  }

  filterAndSort(filters: UserFilter): PredicateIdentity<User[]> {
    return (users) => users.filter(this.filter(filters)).toSorted(this.#sort(filters))
  }

  fromData(data: UserFilterData): UserFilter {
    return {
      email: data.email ?? '',
      page: data.page,
      pageSize: data.pageSize,
      sortBy: data.sortBy ?? [],
      status: data.status ?? '',
    }
  }

  fromDataPaginated(data: UserFilterData): UserFilter {
    return this.fromData({
      ...data,
      page: data?.page ?? 1,
      pageSize: data?.pageSize ?? TokenQueryPageSize.dx20,
    })
  }

  // TODO:
  generate(filters?: Partial<UserFilter>): UserFilter {
    return { ...filters, page: filters?.page ?? 1, sortBy: filters?.sortBy ?? [] }
  }

  // TODO:
  generatePaginated(filters?: Partial<UserFilter>): UserFilter {
    return this.fromDataPaginated({ ...filters, sortBy: filters?.sortBy ?? [] })
  }

  toData(filter: UserFilter): UserFilterData {
    return {
      email: filter.email || undefined,
      page: filter.page,
      pageSize: filter.pageSize,
      sortBy: filter.sortBy,
      status: filter.status || undefined,
    }
  }

  toParams(filter: UserFilter): UserFilterParams {
    return filter
  }
}
