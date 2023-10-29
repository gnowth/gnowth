export enum FilterPageSize {
  i10 = 10,
  i20 = 20,
  i50 = 50,
  i100 = 100,
}

export class ModelFilter {
  static optionsPageSize = Object.values(FilterPageSize).filter(ModelFilter.isFilterPageSize)

  static actionRecalculatePage(page: number, pageSize: FilterPageSize, newPageSize: FilterPageSize) {
    const currentIndex = pageSize * (page - 1)

    return Math.floor(currentIndex / newPageSize) + 1
  }

  static getPageSize(value?: string): FilterPageSize | undefined {
    if (this.isFilterPageSize(value)) {
      return Number(value)
    }
    // TODO throw error if not undefined
    return undefined
  }

  // DEBT: dirty implementation. access string value. Need an abstraction for Options
  static isFilterPageSize(value?: string | FilterPageSize): value is FilterPageSize {
    return FilterPageSize[`i${value}` as keyof typeof FilterPageSize] !== undefined
  }
}
