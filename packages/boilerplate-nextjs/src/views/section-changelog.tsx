import type { FunctionComponent } from 'react'

import { compose } from '../utils/compose'
import LayoutSection from '../components/layout-section'
import MdChangelog from '../../CHANGELOG.md'
import withErrorBoundary from '../utils/with-error-boundary'
import withSuspense from '../utils/with-suspense'

const SectionChangelog: FunctionComponent = () => {
  return (
    <LayoutSection>
      <MdChangelog />
    </LayoutSection>
  )
}

export default compose(withSuspense(), withErrorBoundary)(SectionChangelog)
