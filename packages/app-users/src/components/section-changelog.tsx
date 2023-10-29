import type { FunctionComponent } from 'react'

import MdChangelog from '../../CHANGELOG.md'
import { LayoutSectionDeprecated } from './layout-section-deprecated'
import { withAugmentedDeprecated } from './with-augmented-deprecated'

const SectionChangelogComponent: FunctionComponent = () => {
  return (
    <LayoutSectionDeprecated>
      <MdChangelog />
    </LayoutSectionDeprecated>
  )
}

export const SectionChangelog = withAugmentedDeprecated()(SectionChangelogComponent)
