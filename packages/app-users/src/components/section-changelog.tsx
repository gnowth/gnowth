import type { FunctionComponent } from 'react'

import MdChangelog from '../../CHANGELOG.md'
import { LayoutSection } from './layout-section'
import { withAugmented } from './with-augmented'

const SectionChangelogComponent: FunctionComponent = () => {
  return (
    <LayoutSection>
      <MdChangelog />
    </LayoutSection>
  )
}

export const SectionChangelog = withAugmented()(SectionChangelogComponent)
