import * as R from 'ramda'

import LayoutSection from '../components/layout-section'
import MdChangelog from '../../CHANGELOG.md'
import withErrorBoundary from '../utils/with-error-boundary'
import withSuspense from '../utils/with-suspense'

function SectionChangelog() {
  return (
    <LayoutSection>
      <MdChangelog />
    </LayoutSection>
  )
}

export default R.compose(withSuspense, withErrorBoundary)(SectionChangelog)
