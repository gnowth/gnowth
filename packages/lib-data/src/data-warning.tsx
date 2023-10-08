// import type { DataError, DataName, PropsBoundary } from '@gnowth/lib-types';
import type { DataName } from '@gnowth/lib-types'
import type { PropsBoundary } from '@gnowth/lib-application'
import type { ComponentType, FunctionComponent } from 'react'
// import { useAppBoundary } from '@gnowth/lib-application';
// import { useAsyncPromise } from '@gnowth/lib-async';

// import useDataConnect from './use-data-connect';

interface PropsWarning {
  name?: DataName
  slot?: string
  warning?: ComponentType<PropsBoundary> | string | null
}

// TODO: handle case where default boundary is not set. or get from datasource maybe?
// TODO: handle async properly
// TODO: standardise errors so that error does not need to be mapped to message
export const DataWarning: FunctionComponent<PropsWarning> = (props) => {
  if (!props) return <div />
  // const connection = useDataConnect(props);
  // const Warning = useAppBoundary(props.warning);
  // const stateErrors = useAsyncPromise<DataError[]>(connection.errors);

  // if (!Warning || !stateErrors.value) return null;

  // return <Warning errors={stateErrors.value.map((error) => error.message)} />;
  return <div />
}
