export type ParametersScript = {
  async?: boolean
  container?: HTMLElement
  defer?: boolean
  preload?: boolean
  url: string
}

export class Script {
  inject(parameters: ParametersScript): Promise<Event> {
    if (parameters.preload) {
      this.#scriptPreload(parameters)
    }

    return new Promise((resolve, reject) => {
      const script = this.#scriptGet(parameters)
      const element = script ?? this.#scriptCreate(parameters)
      element.addEventListener('load', resolve)
      element.addEventListener('error', (event) => reject((event as ErrorEvent).error))

      if (!script) {
        const container = parameters.container ?? document.head
        container.appendChild(element)
      }
    })
  }

  #linkCreate(parameters: ParametersScript): HTMLLinkElement {
    const element = document.createElement('link')
    element.href = parameters.url
    element.rel = 'preload'

    return element
  }

  #linkGet(parameters: ParametersScript): Element | null {
    return document.querySelector(`script[src='${parameters.url}']`)
  }

  #scriptCreate(parameters: ParametersScript): HTMLScriptElement {
    const element = document.createElement('script')
    element.src = parameters.url

    return element
  }

  #scriptGet(parameters: ParametersScript): Element | null {
    return document.querySelector(`script[src='${parameters.url}']`)
  }

  #scriptPreload(parameters: ParametersScript): Promise<Event> {
    return new Promise((resolve, reject) => {
      const link = this.#linkGet(parameters)
      const element = link ?? this.#linkCreate(parameters)
      element.addEventListener('load', resolve)
      element.addEventListener('error', (event) => reject((event as ErrorEvent).error))

      if (!link) {
        const container = document.head
        container.appendChild(element)
      }
    })
  }
}
