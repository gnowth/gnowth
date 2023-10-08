import type { AppModelApplication } from '@gnowth/lib-react'
import type { FunctionComponent } from 'react'
import { AppApplication, AppPage, AppRedirect, AppPageNotFound } from '@gnowth/lib-react'

import { PageAboutUs } from './pages/page-about-us'
import { PageComingSoon } from './pages/page-coming-soon'
import { PageFrequentlyAskedQuestions } from './pages/page-frequently-asked-questions'
import { PageMaintenance } from './pages/page-maintenance'
import { PageNotAuthorised } from './pages/page-not-authorised'
import { PageNotFound } from './pages/page-not-found'
import { PageNotPermitted } from './pages/page-not-permitted'
import { PagePrivacy } from './pages/page-privacy'
import { PageTermsAndConditions } from './pages/page-terms-and-conditions'
import { TokenPage } from './app-model-application-pages'

interface Props {
  application?: AppModelApplication | string
  path?: string
}

export const ApplicationPages: FunctionComponent<Props> = (props) => (
  <AppApplication application={props.application ?? 'pages'} path={props.path}>
    <AppPage component={PageAboutUs} page={TokenPage.aboutUs} />

    <AppPage component={PageComingSoon} page={TokenPage.comingSoon} />

    <AppPage component={PageFrequentlyAskedQuestions} page={TokenPage.frequentlyAskedQuestion} />

    <AppPage component={PageMaintenance} page={TokenPage.maintenance} />

    <AppPage component={PageNotAuthorised} page={TokenPage.notAuthorised} />

    <AppPage component={PageNotFound} page={TokenPage.notFound} />

    <AppPage component={PageNotPermitted} page={TokenPage.notPermitted} />

    <AppPage component={PagePrivacy} page={TokenPage.privacy} />

    <AppPage component={PageTermsAndConditions} page={TokenPage.termsAndConditions} />

    <AppRedirect exact from="/pages/" page={TokenPage.aboutUs} />

    <AppPage component={AppPageNotFound} />
  </AppApplication>
)
