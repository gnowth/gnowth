import { DataConnect, DataName, DataSource, DataTrigger, DataWarning } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

import { Task } from '../modules/task'

type Props = {
  onChange?: (value: Task, name?: DataName) => Promise<void> | void
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
