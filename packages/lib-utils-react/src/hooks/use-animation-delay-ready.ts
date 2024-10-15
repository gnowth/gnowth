import { useAnimationDelayValue } from './use-animation-delay-value'

export function useAnimationDelayReady(animationDelay?: number): boolean {
  return useAnimationDelayValue({
    animationDelay,
    value: true,
    valueInitial: false,
  }) as boolean
}
