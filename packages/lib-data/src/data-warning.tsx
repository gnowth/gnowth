// import type { DataError, DataName, PropsBoundary } from '@gnowth/lib-types';
import type { DataName, PropsBoundary } from '@gnowth/lib-types'
import React from 'react'
// import { useAppBoundary } from '@gnowth/lib-application';
// import { useAsyncPromise } from '@gnowth/lib-async';

// import useDataConnect from './use-data-connect';

interface PropsWarning {
  name?: DataName
  slot?: string
  warning?: React.ComponentType<PropsBoundary> | string | null
}

// TODO: handle case where default boundary is not set. or get from datasource maybe?
// TODO: handle async properly
// TODO: standardise errors so that error does not need to be mapped to message
const DataWarning: React.FunctionComponent<PropsWarning> = (props) => {
  if (!props) return <div />
  // const connection = useDataConnect(props);
  // const Warning = useAppBoundary(props.warning);
  // const stateErrors = useAsyncPromise<DataError[]>(connection.errors);

  // if (!Warning || !stateErrors.value) return null;

  // return <Warning errors={stateErrors.value.map((error) => error.message)} />;
  return <div />
}

export default DataWarning
