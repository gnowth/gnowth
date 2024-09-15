import { createRoot } from 'react-dom/client'

import { App } from './components/app'
import { settings } from './modules/settings'
import { setup } from './modules/setup'

const configurations = setup(settings)

const element = document.getElementById('main')
if (element) {
  createRoot(element).render(<App environment={configurations.appModelEnvironment} />)
}
