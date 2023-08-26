import React from 'react'

// TODO: check if we need to add a skip option where value is sent from the start or is it consumer responsibility to switch between values
interface Configs<Value> {
  animationDelay?: number
  value?: Value
  valueInitial?: Value
}

function useAnimationValueDelayed<Value>(configs: Configs<Value>): Value | undefined {
  const [value, setValue] = React.useState(configs.valueInitial)

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setValue(configs.value), configs.animationDelay)

    return () => window.clearTimeout(timeout)
  }, [configs.animationDelay, configs.value])

  return value
}

export default useAnimationValueDelayed
