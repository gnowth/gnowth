import type { FunctionComponent } from 'react'
import { DataConnect, UIPaper } from '@gnowth/lib-react'

interface Props {
  slot: string
}

export const ViewRecipeDescriptions: FunctionComponent<Props> = () => (
  <UIPaper palette="text" paletteWeight="a100">
    <DataConnect component="text" name="name" />
  </UIPaper>
)
