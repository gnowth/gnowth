import { AppApplication, AppModelApplication, AppPage, AppPageNotFound, AppRedirect } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

import { PagesPageToken } from '../modules/application-pages'
import { PageAboutUs } from './page-about-us'
import { PageComingSoon } from './page-coming-soon'
import { PageFrequentlyAskedQuestions } from './page-frequently-asked-questions'
import { PageMaintenance } from './page-maintenance'
import { PageNotAuthorised } from './page-not-authorised'
import { PageNotFound } from './page-not-found'
import { PageNotPermitted } from './page-not-permitted'
import { PagePrivacy } from './page-privacy'
import { PageTermsAndConditions } from './page-terms-and-conditions'

type Props = {
  application?: AppModelApplication | string
  path?: string
}

export const ApplicationPages: FunctionComponent<Props> = (props) => (
  <AppApplication application={props.application ?? 'pages'} path={props.path}>
    <AppPage component={PageAboutUs} page={PagesPageToken.aboutUs} />

    <AppPage component={PageComingSoon} page={PagesPageToken.comingSoon} />

    <AppPage component={PageFrequentlyAskedQuestions} page={PagesPageToken.frequentlyAskedQuestion} />

    <AppPage component={PageMaintenance} page={PagesPageToken.maintenance} />

    <AppPage component={PageNotAuthorised} page={PagesPageToken.notAuthorised} />

    <AppPage component={PageNotFound} page={PagesPageToken.notFound} />

    <AppPage component={PageNotPermitted} page={PagesPageToken.notPermitted} />

    <AppPage component={PagePrivacy} page={PagesPageToken.privacy} />

    <AppPage component={PageTermsAndConditions} page={PagesPageToken.termsAndConditions} />

    <AppRedirect exact from="/pages/" page={PagesPageToken.aboutUs} />

    <AppPage component={AppPageNotFound} />
  </AppApplication>
)
