import type { FunctionComponent } from 'react'
import { LayoutSectionDeprecated, withAugmentedDeprecated } from '@gnowth/app-core'

import MdChangelog from '../../CHANGELOG.md'

const SectionChangelogComponent: FunctionComponent = () => {
  return (
    <LayoutSectionDeprecated>
      <MdChangelog />
    </LayoutSectionDeprecated>
  )
}

export const SectionChangelog = withAugmentedDeprecated()(SectionChangelogComponent)
