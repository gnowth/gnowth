import { UtilNamespaced } from '@gnowth/lib-utils'

type Medias = UtilNamespaced<Media, MediaName>
type Configs = { medias?: Medias }

export type MediaName = string
export type Media = unknown

export class ServiceThemeMedia {
  #medias: Medias

  constructor(configs?: Configs) {
    this.#medias = configs?.medias ?? {}
  }

  configsMerge(...configs: Configs[]): Configs {
    return { medias: Object.assign({}, ...configs.map((config) => config.medias)) }
  }

  getMedia(name: MediaName): Media | undefined {
    return this.#medias[name]
  }
}
