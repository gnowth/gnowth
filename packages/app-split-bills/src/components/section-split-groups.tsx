import type { FunctionComponent } from 'react'
import { LayoutSection, UIList, useInterface, useQuery } from '@gnowth/lib-react'

import { InterfaceUIListSplitGroups } from './section-split-groups.interfaces'

export const SectionSplitGroup: FunctionComponent = () => {
  const interfaceUIListSplitGroups = useInterface(InterfaceUIListSplitGroups, {})
  const { serviceSplitGroups } = useServices(['serviceSplitGroups'])
  const { data } = useQuery(serviceSplitGroups.keyList(), serviceSplitGroups.queryList)

  return (
    <LayoutSection>
      <UIList type="list" items={data} interface={interfaceUIListSplitGroups} />
    </LayoutSection>
  )
}
