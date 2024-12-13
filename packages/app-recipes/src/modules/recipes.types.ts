import { Media } from '@gnowth/lib-react'

import { Ingredient } from './ingredients'

export type Recipe = {
  ingredients: Ingredient[]
  media: Media[]
  mediaPrimary: string
  methods: string[]
  name: string
  steps: Step[]
  tags: Tag[]
}

type Step = {
  name: string
}

type Tag = {
  label: string
}
