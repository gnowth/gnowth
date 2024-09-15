import { MutableRefObject, useRef } from 'react'

export function useRefValue<Value>(value: Value): MutableRefObject<Value> {
  const refValue = useRef(value)
  refValue.current = value

  return refValue
}
