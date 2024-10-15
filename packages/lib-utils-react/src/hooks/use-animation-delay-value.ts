import { useEffect, useState } from 'react'

// TODO: check if we need to add a skip option where value is sent from the start or is it consumer responsibility to switch between values
type Configs<Value> = {
  animationDelay?: number
  value?: Value
  valueInitial?: Value
}

export function useAnimationDelayValue<Value>(configs: Configs<Value>): Value | undefined {
  const [value, setValue] = useState(configs.valueInitial)

  useEffect(() => {
    const timeout = window.setTimeout(() => setValue(configs.value), configs.animationDelay)

    return () => window.clearTimeout(timeout)
  }, [configs.animationDelay, configs.value])

  return value
}
