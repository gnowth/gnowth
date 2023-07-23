export type SplitParticipant = {
  email: string
  id: string
  name: string
}

type Discount = ''
type Media = ''
type Tax = ''
type SplitMethod = {
  enabled: boolean
  participantId: string
  type: 'amount' | 'percentage' | 'share'
  value: number
}

type SplitItem = {
  description: string
  discount: Discount[]
  id: string
  media: Media[]
  name: string
  price: number
  quantity: number
  splits: SplitMethod[]
  taxes: Tax[]
}

export type SplitBill = {
  amount: number
  description: string
  discount: Discount[]
  group: SplitGroup
  id: string
  items: SplitItem[]
  media: Media[]
  name: string
  splits: SplitMethod[]
  tips: number
  paidBy: SplitParticipant
  paidDate: string
}

export type SplitGroup = {
  description: string
  id: string
  media: Media[]
  name: string
  participants: SplitParticipant[]
  splits: SplitMethod[]
}

class ModelSplitBill {
  fromPartial(partial1: Partial<SplitBill>, partial2: Partial<SplitBill>): SplitBill {
    return {
      description: '',
      discount: [],
      id: '',
      items: [],
      key: '',
      media: [],
      name: 'Bill',
      splits: [],
      tips: 0,
      ...partial1,
      ...partial2,
    }
  }

  async validateAsync(splitBill: SplitBill): Promise<ErrorType[]> {
    return splitBill ? [] : []
  }

  validateField() {
    return []
  }
}

export class ModelSplitItem {
  fromPartial(partial1?: Partial<SplitItem>, partial2?: Partial<SplitItem>): SplitItem {
    return {
      description: '',
      discount: [],
      media: [],
      name: '',
      price: 0,
      quantity: 1,
      splits: [],
      taxes: [],
      ...partial1,
      ...partial2,
    }
  }

  validate() {
    return []
  }
}

class ModelSplitMethod {
  fromPartial(partial1?: Partial<SplitMethod>, partial2?: Partial<SplitMethod>): SplitMethod {
    return {
      participantId: '',
      type: 'share',
      value: 1,
      ...partial1,
      ...partial2,
    }
  }

  validate() {
    return []
  }
}

export class ModelSplitParticipant {
  fromPartial() {
    return {}
  }

  validate() {
    return []
  }
}

export class ModelSplitGroup {
  fromPartial() {
    return {}
  }

  validate() {
    return []
  }
}
