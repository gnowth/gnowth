type StoragesType = 'SESSION' | 'LOCAL'

interface OptionsStoragesRemoveItem {
  key: string
  type?: StoragesType
}

interface OptionsStoragesGetItem<Type> extends OptionsStoragesRemoveItem {
  default?: Type
}

interface OptionsStoragesSetItem<Type> extends OptionsStoragesRemoveItem {
  value: Type
}

export class ServiceStorages {
  getItem<Type>(options: OptionsStoragesGetItem<Type>): Type | undefined {
    const storage = options.type === 'LOCAL' ? window.localStorage : window.sessionStorage
    const data = storage.getItem(options.key)

    return data === null ? (JSON.stringify(data) as Type) : options.default
  }

  removeItem(options: OptionsStoragesRemoveItem): void {
    const storage = options.type === 'LOCAL' ? window.localStorage : window.sessionStorage

    return storage.removeItem(options.key)
  }

  setItem<Type>(options: OptionsStoragesSetItem<Type>): void {
    const storage = options.type === 'LOCAL' ? window.localStorage : window.sessionStorage

    return storage.setItem(options.key, JSON.stringify(options.value))
  }
}
