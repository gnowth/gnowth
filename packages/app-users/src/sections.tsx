import { ViewSpacerDeprecated } from '@gnowth/app-users'

import { FormUser } from './components/form-user'
import { FormUserFilter } from './components/form-user-filter'
import { FormGroup } from './components/form-group'
import { FormGroupFilter } from './components/form-group-filter'
import { SectionChangelog } from './components/section-changelog'
import { SectionFooter } from './components/section-footer'
import { SectionHeader } from './components/section-header'
import { SectionUsers } from './components/section-users'
import { SectionGroups } from './components/section-groups'

export const sections = {
  FormGroup,
  FormGroupFilter,
  FormUser,
  FormUserFilter,
  SectionChangelog,
  SectionFooter,
  SectionGroups,
  SectionHeader,
  SectionUsers,
  ViewSpacer: ViewSpacerDeprecated,
}
