import type { FunctionComponent } from 'react'
import { LayoutSection, withAugmented } from '@app/core'

import MdChangelog from '../../CHANGELOG.md'

const SectionChangelog: FunctionComponent = () => {
  return (
    <LayoutSection>
      <MdChangelog />
    </LayoutSection>
  )
}

export default withAugmented()(SectionChangelog)
