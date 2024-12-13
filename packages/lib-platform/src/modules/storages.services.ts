type OptionsStorageGetItem<Type> = OptionsStorageRemoveItem & {
  default?: Type
}

type OptionsStorageRemoveItem = {
  key: string
  type?: StorageType
}

type OptionsStorageSetItem<Type> = OptionsStorageRemoveItem & {
  value: Type
}

type StorageType = 'LOCAL' | 'SESSION'

// TODO: add abiliity to retrieve cookie?
export class StorageService {
  getItem<Type>(options: OptionsStorageGetItem<Type>): Type | undefined {
    const storage = options.type === 'LOCAL' ? window.localStorage : window.sessionStorage
    const data = storage.getItem(options.key)

    return data === null ? (JSON.stringify(data) as Type) : options.default
  }

  removeItem(options: OptionsStorageRemoveItem): void {
    const storage = options.type === 'LOCAL' ? window.localStorage : window.sessionStorage

    return storage.removeItem(options.key)
  }

  setItem<Type>(options: OptionsStorageSetItem<Type>): void {
    const storage = options.type === 'LOCAL' ? window.localStorage : window.sessionStorage

    return storage.setItem(options.key, JSON.stringify(options.value))
  }
}
