import { useContext } from 'react'

import AppModelApplication from './app-model-application'
import ContextApplication from './context-application'
import useAppEnvironment from './use-app-environment'

function useAppApplication<Application extends AppModelApplication>(
  application?: Application | string,
): Application {
  const environment = useAppEnvironment()
  const contextApplication = useContext(ContextApplication)

  return (
    application ? environment.getApplication(application) : contextApplication.application
  ) as Application
}

export default useAppApplication
