import type { FunctionComponent } from 'react'
import { LayoutSection, compose, withBoundary, withSuspense } from '@app/core'

import MdChangelog from '../../CHANGELOG.md'

const SectionChangelog: FunctionComponent = () => {
  return (
    <LayoutSection>
      <MdChangelog />
    </LayoutSection>
  )
}

export default compose(withSuspense(), withBoundary())(SectionChangelog)
