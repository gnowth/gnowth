import type { DataName } from '@gnowth/lib-react'
import type { FunctionComponent } from 'react'

import { DataConnect, DataSource, DataTrigger, DataWarning } from '@gnowth/lib-react'

import type { Task } from '../modules/task'

interface Props {
  onChange?: (value: Task, name?: DataName) => Promise<void> | void
  value?: Task
}

export const FormTaskCreate: FunctionComponent<Props> = (props) => (
  <DataSource onChange={props.onChange} value={props.value}>
    <DataConnect name="title" />

    <DataConnect name="description" />

    <DataWarning />

    <DataTrigger componentValue="Submit" />
  </DataSource>
)
