export interface ServiceQueryKeyDetail {
  entity: string
  id: string
  scope: string
}

export interface ServiceQueryKeyList<Filters = Record<string, string>> {
  entity: string
  filters: Filters
  scope: string
}
