import React from 'react'

function usePrevious<Value>(value?: Value): Value | undefined {
  const ref = React.useRef(value)

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
export default usePrevious
