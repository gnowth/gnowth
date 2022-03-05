import { v4 as uuid } from 'uuid'

export interface Team {
  avatar?: string
  id?: string
  idLocal: string
  name: string
  role: string
}

export interface TeamSerialized {
  avatar?: string
  id?: string
  name?: string
  role?: string
}

class ModelTeam {
  static deserialize = (team: TeamSerialized): Team => {
    return {
      avatar: team.avatar,
      id: team.id,
      idLocal: team.id ?? uuid(),
      name: team.name ?? 'N/A',
      role: team.role ?? 'N/A',
    }
  }

  static serialize = (team: Team): TeamSerialized => {
    return team
  }
}

export default ModelTeam
