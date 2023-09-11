import type { AppModelApplication } from '@gnowth/lib-react'
import React from 'react'
import { AppApplication, AppPage, AppRedirect, AppPageNotFound } from '@gnowth/lib-react'

import { PageDashboard } from './pages/page-dashboard'
import { PageIngredient } from './pages/page-ingredient'
import { PageLanding } from './pages/page-landing'
import { PageRecipeEdit } from './pages/page-recipe-edit'
import { PageRecipes } from './pages/page-recipes'
import { TokenPage } from './models/app-model-application-recipes'

interface Props {
  application?: AppModelApplication | string
  path?: string
}

// TODO: allow AppPage to get component from context
// allow preloading data in Application and AppPage? appPage would be page model, and application can be general data
export const ApplicationRecipes: React.FunctionComponent<Props> = (props) => (
  <AppApplication application={props.application ?? 'recipes'} path={props.path}>
    <AppPage component={PageLanding} page={TokenPage.landing} />

    <AppPage authenticated component={PageDashboard} page={TokenPage.dashboard} />

    <AppPage authenticated component={PageRecipeEdit} page={TokenPage.recipe} />

    <AppPage authenticated component={PageRecipes} exact page={TokenPage.recipes} />

    <AppPage authenticated component={PageIngredient} page={TokenPage.ingredient} />

    <AppRedirect from="/recipes/" exact page={TokenPage.landing} />

    <AppPage component={AppPageNotFound} />
  </AppApplication>
)
