import { AppModelApplicationAuth } from '@gnowth/app-auth'
import { AppModelApplicationPages } from '@gnowth/app-pages'
import { AppModelApplicationRecipes } from '@gnowth/app-recipe'
import { AppModelApplicationTasks } from '@gnowth/app-tasks'
import { AppModelEnvironment } from '@gnowth/lib-react'

export enum TokenApplication {
  auth = 'auth',
  pages = 'pages',
  recipes = 'recipes',
  tasks = 'tasks',
}

const routes = {
  [TokenApplication.auth]: () => `/${TokenApplication.auth}/`,
  [TokenApplication.pages]: () => `/${TokenApplication.pages}/`,
  [TokenApplication.recipes]: () => `/${TokenApplication.recipes}/`,
  [TokenApplication.tasks]: () => `/${TokenApplication.tasks}/`,
}

class AppModelEnvironmentMono extends AppModelEnvironment {
  routes = routes

  initializeApplications() {
    const applicationAuth = new AppModelApplicationAuth({ route: routes[TokenApplication.auth]() })

    return {
      [TokenApplication.auth]: applicationAuth,

      [TokenApplication.pages]: new AppModelApplicationPages({
        route: routes[TokenApplication.pages](),
      }),

      [TokenApplication.recipes]: new AppModelApplicationRecipes({
        route: routes[TokenApplication.recipes](),
        user: applicationAuth.models.user,
      }),

      [TokenApplication.tasks]: new AppModelApplicationTasks({
        route: routes[TokenApplication.tasks](),
      }),
    }
  }
}

export default new AppModelEnvironmentMono()
