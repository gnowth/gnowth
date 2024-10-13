import { Media } from '@gnowth/lib-react'

import { Ingredient } from './ingredients'

type Step = {
  name: string
}

type Tag = {
  label: string
}

export type Recipe = {
  ingredients: Ingredient[]
  media: Media[]
  mediaPrimary: string
  methods: string[]
  name: string
  steps: Step[]
  tags: Tag[]
}
