import type { FunctionComponent } from 'react'
import { LayoutSection, withAugmented } from '@gnowth/core-app'

import MdChangelog from '../../CHANGELOG.md'

const SectionChangelog: FunctionComponent = () => {
  return (
    <LayoutSection>
      <MdChangelog />
    </LayoutSection>
  )
}

export default withAugmented()(SectionChangelog)
