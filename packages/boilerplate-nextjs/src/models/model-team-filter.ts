export interface TeamFilter {
	name?: string
	page?: string
	pageSize?: string
}

export interface TeamFilterSerialized {
	name?: string
	page?: string
	pageSize?: string
}

class ModelTeamFilter {}

export default ModelTeamFilter
