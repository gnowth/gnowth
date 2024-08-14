import type { FunctionComponent } from 'react'

// TODO: find a way to import md properly
// import MdChangelog from '../../CHANGELOG.md'
import { LayoutSection } from './layout-section'
import { withAugmented } from './with-augmented'

const SectionChangelogComponent: FunctionComponent = () => {
  return <LayoutSection>Changelog</LayoutSection>
}

export const SectionChangelog = withAugmented()(SectionChangelogComponent)
