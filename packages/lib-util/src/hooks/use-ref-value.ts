import React from 'react'

export function useRefValue<Value>(value: Value): React.MutableRefObject<Value> {
  const refValue = React.useRef(value)
  refValue.current = value

  return refValue
}
