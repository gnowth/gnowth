import { DataConnect, UIPaper } from '@gnowth/lib-react'
import { FunctionComponent } from 'react'

type Props = {
  slot: string
}

export const ViewRecipeDescriptions: FunctionComponent<Props> = () => {
  return (
    <UIPaper palette="text" paletteWeight="a100">
      <DataConnect component="text" name="name" />
    </UIPaper>
  )
}
