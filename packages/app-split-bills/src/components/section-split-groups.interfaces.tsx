import type { InterfaceUIList } from '@gnowth/lib-react'

import type { SplitGroup } from '../modules/split-bill'

export class InterfaceUIListSplitGroups implements InterfaceUIList {
  headerAvatar(group: SplitGroup): Media | undefined {
    return group.media.find((mediaItem) => mediaItem.type === 'AVATAR')
  }

  headerHeader(group: SplitGroup): string {
    return group.name
  }

  headerHeaderSub(group: SplitGroup): string {
    return group.description
  }
}
