import useAnimationDelayValue from './use-animation-delay-value'

interface PropsAnimationDelayKey<Key> {
  animationDelayKey: Key
  animationDelay?: number
}

function useAnimationDelayProps<Props extends PropsAnimationDelayKey<Key>, Key extends keyof Props>(
  props: Props,
): Props {
  const value = useAnimationDelayValue({
    animationDelay: props.animationDelay,
    value: props[props.animationDelayKey],
  })

  return { ...props, [props.animationDelayKey]: value }
}

export default useAnimationDelayProps
