import type { FunctionComponent } from 'react'
import { LayoutSection, withAugmented } from '@gnowth/core-app'

import MdChangelog from '../../CHANGELOG.md'

const SectionChangelogComponent: FunctionComponent = () => {
  return (
    <LayoutSection>
      <MdChangelog />
    </LayoutSection>
  )
}

export const SectionChangelog = withAugmented()(SectionChangelogComponent)
