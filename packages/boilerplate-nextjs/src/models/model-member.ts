import { v4 as uuid } from 'uuid'

export interface Member {
  avatar?: string
  email: string
  id?: string
  idLocal: string
  nameFirst: string
  nameLast: string
  role: string
  status: 'active' | 'deactivated'
}

export interface MemberSerialized {
  avatar?: string
  email?: string
  id?: string
  nameFirst?: string
  nameLast?: string
  role?: string
  status?: 'active' | 'deactivated'
}

class ModelMember {
  // Serializer
  static deserialize = (member: MemberSerialized): Member => {
    return {
      avatar: member.avatar,
      email: member.email ?? '',
      id: member.id,
      idLocal: member.id ?? uuid(),
      nameFirst: member.nameFirst ?? '',
      nameLast: member.nameLast ?? '',
      role: member.role ?? 'N/A',
      status: member.status ?? 'deactivated',
    }
  }

  static serialize = (member: Member): MemberSerialized => {
    return member
  }

  // Getter
  static getNameFull = (member: Member) => {
    return `${member.nameFirst} ${member.nameLast}`
  }

  // Filter

  // Transform
  static toId = (member: Member) => {
    return member.id ?? member.idLocal
  }

  static toIdServer = (member: Member) => {
    return member.id
  }

  static toString = (member: Member) => {
    return `${member.nameLast}, ${member.nameFirst}`
  }
}

export default ModelMember
