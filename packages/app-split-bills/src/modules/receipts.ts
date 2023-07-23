// type Person = {
//   id: string
//   name: string
//   userId?: string
// }

type Participant = {
  idVirtual: string
}

// type Participant = Person | User

// type Business = {
//   abn: string
//   address: string
//   media: Media[]
//   name: string
// }

type Receipt = {
  // business: Business
  // issuedBy: Person
  // issuedDate: string
  items: ReceiptItem[]
  // payments: Payment[]
  // rewards: Reward[]
  // total: number
  // user: User
}

// type Payment = {
//   items: string[]
//   method: PaymentMethod
//   tips: number
// }

// type PaymentMethod = {
//   type: 'cash' | 'debit' | 'credit'
// }

type SplitBill = {
  participants: Participant[]
  // receipt: Receipt
  // media: Media[]
  items: SplitItem
  splitType: 'equally' | 'custom' | 'single'
}

type SplitItem = {
  idVirtual: string
  itemIdVirtual: string
  split: Split[]
  splitType: 'equally' | 'custom' | 'single'
}

type Split = {
  participantIdVirtual: string
  type: 'amount' | 'percentage' | 'share'
  value: number
}

type ReceiptItem = {
  // barcode: string
  // currency: string
  // discount: string
  idVirtual: string
  name: string
  price: string
  quantity: number
  taxes: Tax[]
}

// interface OptionsTypeSelect {
//   itemId: string
//   type: SplitItem['splitType']
// }

interface dependencies {
  serviceLogger: ''
}

// class ModelSplitBill1 {
//   private dependencies: dependencies

//   constructor(options) {
//     this.dependencies = options.dependencies
//   }

//   private splitValidatePartial(split: Partial<Split>): ErrorType[] {
//     return split ? [] : []
//   }

//   private splitUpdate(update1: Partial<Split> = {}, update2: Partial<Split> = {}): Split {
//     const update = { ...update1, ...update2 }

//     this.dependencies.serviceLogger?.bugIfErrors({
//       enabled: true,
//       errors: this.splitValidatePartial(update),
//       message: 'not enough information in partial split',
//       method: 'splitUpdate',
//       payload: { update1, update2 },
//     })

//     return {
//       type: 'share',
//       value: 1,
//       ...update,
//     }
//   }

//   private splitsGenerate(splitBill: SplitBill, options: { type: Split['type'] }): Split[] {
//     return splitBill.participants.map((participant) => this.splitGenerate({ participantId: participant.id }))
//   }

//   @bugIfErrors({})
//   update(update1: Partial<SplitBill>, update2: Partial<SplitBill>): SplitBill {
//     return {
//       ...update1,
//       ...update2,
//     }
//   }

//   private updateValidate() {

//   }

//   typeSelect(splitBill: SplitBill, options: OptionsTypeSelect) {
//     return this.update(splitBill, {
//       items: {
//         ...splitBill.items,
//         [options.itemId]: {
//           // ...options.splitBill.receipt.items[options.itemId],
//           itemId: options.itemId,
//           ...options.splitBill.items[options.itemId],
//           type: options.type,
//         },
//       },
//     })
//   }

//   validateItemId(options: { itemId: string; splitBill: SplitBill }) {
//     return !!options.splitBill.items[options.itemId]
//   }
// }

class ModelSplitBill {
  // splitItemUpdate(update1?: Partial<SplitItem>, update2: Partial<SplitItem>): SplitItem {
  //   return {
  //     // id: string
  //     split: Split[]
  //     splitType: 'equally' | 'custom' | 'single',
  //     ...update1,
  //     ...update2,
  //   }
  // }

  // splitUpdate(update1?: Partial<Split>, update2?: Partial<Split>): Split {
  //   return {
  //     type: 'share'
  //     value: 1,
  //     ...update1,
  //     ...update2,
  //   }
  // }

  // splitItemUpdate(update1?: Partial<SplitItem>, update2?: Partial<SplitItem>): SplitItem {
  //   return {
  //     split: [],
  //     splitType: 'equally',
  //     ...update1,
  //     ...update2,
  //   }
  // }

  // fromReceipt(receipt: Receipt, splitBill?: Partial<SplitBill>): SplitBill {
  //   return this.update(splitBill, {
  //     items: receipt.items.map((item) => this.splitItemFromReceiptItem(item))
  //   })
  // }

  update(update1?: Partial<SplitBill>, update2?: Partial<SplitBill>): SplitBill {
    return {
      items: [],
      participants: [],
      splitType: 'equally',
      ...update1,
      ...update2,
    }
  }

  // private splitItemFromReceiptItem(receiptItem: ReceiptItem): SplitItem {
  //   return {
  //     idVirtual: ''
  //     itemIdVirtual: receiptItem.idVirtual
  //   }
  // }
}
