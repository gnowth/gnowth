export interface MemberFilter {
  email?: string
  page?: string
  pageSize?: string
}

export interface MemberFilterSerialized {
  email?: string
  page?: string
  pageSize?: string
}

class ModelMemberFilter {}

export default ModelMemberFilter
