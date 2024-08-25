type ScriptParameters = {
  async?: boolean
  container?: HTMLElement
  defer?: boolean
  preload?: boolean
  url: string
}

const linkCreate = (parameters: ScriptParameters): HTMLLinkElement => {
  const element = document.createElement('link')
  element.href = parameters.url
  element.rel = 'preload'
  return element
}

const linkGet = (parameters: ScriptParameters): Element | null => {
  return document.querySelector(`script[src='${parameters.url}']`)
}

const scriptCreate = (parameters: ScriptParameters): HTMLScriptElement => {
  const element = document.createElement('script')
  element.src = parameters.url
  return element
}

const scriptGet = (parameters: ScriptParameters): Element | null => {
  return document.querySelector(`script[src='${parameters.url}']`)
}

const scriptPreload = (parameters: ScriptParameters): Promise<Event> => {
  return new Promise((resolve, reject) => {
    const link = linkGet(parameters)
    const element = link ?? linkCreate(parameters)
    element.addEventListener('load', resolve)
    element.addEventListener('error', (event) => reject((event as ErrorEvent).error))
    if (!link) {
      const container = document.head
      container.appendChild(element)
    }
  })
}

export const scriptInject = async (parameters: ScriptParameters): Promise<Event> => {
  if (parameters.preload) {
    scriptPreload(parameters)
  }
  return new Promise((resolve, reject) => {
    const script = scriptGet(parameters)
    const element = script ?? scriptCreate(parameters)
    element.addEventListener('load', resolve)
    element.addEventListener('error', (event) => reject((event as ErrorEvent).error))
    if (!script) {
      const container = parameters.container ?? document.head
      container.appendChild(element)
    }
  })
}

export const scriptImport = async (parameters: ScriptParameters) => {
  await scriptInject(parameters)
  // https://medium.com/front-end-weekly/webpack-and-dynamic-imports-doing-it-right-72549ff49234
  // https://webpack.js.org/api/module-methods/
  return import(/* @vite-ignore */ '' + parameters.url)
}
