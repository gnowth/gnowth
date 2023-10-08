import type { DataName } from '@gnowth/lib-data'
import type { FunctionComponent } from 'react'
import { DataConnect, DataSource, DataTrigger, DataWarning } from '@gnowth/lib-react'

import type { Task } from '../@types'

interface Props {
  onChange?: (value: Task, name?: DataName) => void | Promise<void>
  value?: Task
}

export const FormTaskEdit: FunctionComponent<Props> = (props) => (
  <DataSource onChange={props.onChange} value={props.value}>
    <DataConnect name="title" />

    <DataConnect name="description" />

    <DataWarning />

    <DataTrigger componentValue="Submit" />
  </DataSource>
)
