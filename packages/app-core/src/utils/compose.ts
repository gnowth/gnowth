import type { ComponentType } from 'react'

import type { HigherComponent } from '../types'

function compose<Props>(...higherComponents: HigherComponent<Props>[]): HigherComponent<Props> {
  return function (component: ComponentType<Props>): ComponentType<Props> {
    return higherComponents.reduceRight(
      (prevComponent, higherComponent) => higherComponent(prevComponent),
      component,
    )
  }
}

export default compose
