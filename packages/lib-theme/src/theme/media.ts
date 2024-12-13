import { UtilNamespaced } from '@gnowth/lib-utils'

export type Media = unknown
export type MediaName = string

type Configs = { medias?: Medias }
type Medias = UtilNamespaced<Media, MediaName>

export class MediaManager {
  #medias: Medias

  constructor(configs?: Configs) {
    this.#medias = configs?.medias ?? {}
  }

  configsMerge(...configs: Configs[]): Configs {
    return { medias: Object.assign({}, ...configs.map((config) => config.medias)) }
  }

  get(name: MediaName): Media | undefined {
    return this.#medias[name]
  }
}
