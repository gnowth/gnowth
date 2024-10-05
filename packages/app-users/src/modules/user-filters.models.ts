import {
  FilterModel,
  PlatformConstant,
  PlatformParameters,
  PredicateArrayFilter,
  PredicateIdentity,
  PredicateSort,
  SortDirection,
  SortKeyType,
  operatorArrayFilterAnd,
  operatorSortMultiple,
  predicateSortFn,
} from '@gnowth/lib-react'
import * as R from 'remeda'

import { userFilterSchema, userFilterSchemaData, userFilterSchemaParams } from './user-filters.schemas'
import { UserFilter, UserFilterData, UserFilterParams } from './user-filters.types'
import { User } from './users'

type UserFilterKey = 'email' | 'nameFirst' | 'nameLast' | 'status'
type UserSortKey = 'email' | 'nameFirst' | 'nameLast' | 'status'

type Parameters = { filterModel: FilterModel }
export class UserFilterModel {
  #filterModel: FilterModel
  #userStatuses: User['status'][] = ['active', 'deactivated']

  fromData = (userFilterData: UserFilterData): UserFilter => {
    return userFilterSchema.parse(userFilterData)
  }

  toData = (userFilter: UserFilter): UserFilterData => {
    return userFilterSchemaData.parse(userFilter)
  }

  constructor(parameters: Parameters) {
    this.#filterModel = parameters.filterModel
  }

  static async construct(parameters: PlatformParameters): Promise<UserFilterModel> {
    const filterModel = await parameters.platform.providerGet<FilterModel>({
      name: PlatformConstant.filterModel,
      type: 'provider',
    })
    return new this({ filterModel })
  }

  #filterByEmail(email?: string): PredicateArrayFilter<User> {
    return !email ? this.#filterNone() : (user) => user.email.toLowerCase().includes(email.toLowerCase())
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
      email: this.#filterByEmail(filter.email),
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
    return (users) => users.filter(this.filter(filters)).toSorted(this.sort(filters))
  }

  sort(filter: UserFilter): PredicateSort<User> {
    const sorts: Record<UserSortKey, (direction?: SortDirection) => PredicateSort<User>> = {
      email: this.#sortByEmail,
      nameFirst: this.#sortByNameFirst,
      nameLast: this.#sortByNameLast,
      status: this.#sortByStatus,
    }

    const sortPredicates =
      filter.sortBy?.map((key) => {
        const descending = key.startsWith('-')
        const dictionaryKey = (descending ? key.slice(1) : key) as SortKeyType<UserSortKey>

        return sorts[dictionaryKey](descending ? 'descending' : 'ascending')
      }) ?? []

    return operatorSortMultiple(...sortPredicates)
  }

  toParams(userFilter: UserFilter): UserFilterParams {
    return userFilterSchemaParams.parse(userFilter)
  }

  toParamsClient(userFilter: UserFilter): UserFilterParams {
    return userFilterSchemaParams.parse(userFilter)
  }
}
