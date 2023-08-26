import useAnimationValueDelayed from './use-animation-delay-value'

function useAnimationReadyDelayed(animationDelay?: number): boolean {
  return useAnimationValueDelayed({
    animationDelay,
    value: true,
    valueInitial: false,
  }) as boolean
}

export default useAnimationReadyDelayed
