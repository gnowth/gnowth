import { AppApplication, AppModelApplication, AppPage, AppPageNotFound, AppRedirect } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

import { TokenPage } from '../modules/application-recipes'
import { PageDashboard } from './page-dashboard'
import { PageIngredient } from './page-ingredient'
import { PageLanding } from './page-landing'
import { PageRecipeEdit } from './page-recipe-edit'
import { PageRecipes } from './page-recipes'

interface Props {
  application?: AppModelApplication | string
  path?: string
}

// TODO: allow AppPage to get component from context
// allow preloading data in Application and AppPage? appPage would be page model, and application can be general data
export const ApplicationRecipes: FunctionComponent<Props> = (props) => (
  <AppApplication application={props.application ?? 'recipes'} path={props.path}>
    <AppPage component={PageLanding} page={TokenPage.landing} />

    <AppPage authenticated component={PageDashboard} page={TokenPage.dashboard} />

    <AppPage authenticated component={PageRecipeEdit} page={TokenPage.recipe} />

    <AppPage authenticated component={PageRecipes} exact page={TokenPage.recipes} />

    <AppPage authenticated component={PageIngredient} page={TokenPage.ingredient} />

    <AppRedirect exact from="/recipes/" page={TokenPage.landing} />

    <AppPage component={AppPageNotFound} />
  </AppApplication>
)
