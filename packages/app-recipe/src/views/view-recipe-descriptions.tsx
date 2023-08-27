import React from 'react'
import { DataConnect, UIPaper } from '@gnowth/lib-react'

interface Props {
  slot: string
}

const ViewRecipeDescriptions: React.FunctionComponent<Props> = () => (
  <UIPaper palette="text" paletteWeight="a100">
    <DataConnect component="text" name="name" />
  </UIPaper>
)

export default ViewRecipeDescriptions
